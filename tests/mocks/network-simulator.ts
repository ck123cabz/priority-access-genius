/**
 * Network condition simulator
 * Provides utilities to test application behavior under different network conditions
 */

export type NetworkCondition = 
  | 'offline'
  | 'slow-3g' 
  | 'fast-3g'
  | 'regular-4g'
  | 'wifi'
  | 'unstable'
  | 'timeout-prone';

export interface NetworkProfile {
  name: NetworkCondition;
  latency: number; // milliseconds
  downloadSpeed: number; // bytes per second
  uploadSpeed: number; // bytes per second
  reliability: number; // 0-1, chance of request success
  timeoutRate: number; // 0-1, chance of timeout
  description: string;
}

export interface NetworkSimulationOptions {
  condition: NetworkCondition;
  enableLogs?: boolean;
  customProfile?: Partial<NetworkProfile>;
}

/**
 * Predefined network profiles for common scenarios
 */
export const NETWORK_PROFILES: Record<NetworkCondition, NetworkProfile> = {
  offline: {
    name: 'offline',
    latency: 0,
    downloadSpeed: 0,
    uploadSpeed: 0,
    reliability: 0,
    timeoutRate: 1,
    description: 'No network connection',
  },
  'slow-3g': {
    name: 'slow-3g',
    latency: 2000,
    downloadSpeed: 50 * 1024, // 50 KB/s
    uploadSpeed: 25 * 1024, // 25 KB/s
    reliability: 0.7,
    timeoutRate: 0.3,
    description: 'Slow 3G connection with high latency',
  },
  'fast-3g': {
    name: 'fast-3g',
    latency: 562,
    downloadSpeed: 200 * 1024, // 200 KB/s
    uploadSpeed: 100 * 1024, // 100 KB/s
    reliability: 0.85,
    timeoutRate: 0.15,
    description: 'Fast 3G connection',
  },
  'regular-4g': {
    name: 'regular-4g',
    latency: 170,
    downloadSpeed: 1.5 * 1024 * 1024, // 1.5 MB/s
    uploadSpeed: 750 * 1024, // 750 KB/s
    reliability: 0.95,
    timeoutRate: 0.05,
    description: 'Regular 4G/LTE connection',
  },
  wifi: {
    name: 'wifi',
    latency: 28,
    downloadSpeed: 10 * 1024 * 1024, // 10 MB/s
    uploadSpeed: 5 * 1024 * 1024, // 5 MB/s
    reliability: 0.99,
    timeoutRate: 0.01,
    description: 'High-speed WiFi connection',
  },
  unstable: {
    name: 'unstable',
    latency: 800,
    downloadSpeed: 100 * 1024, // 100 KB/s
    uploadSpeed: 50 * 1024, // 50 KB/s
    reliability: 0.4,
    timeoutRate: 0.6,
    description: 'Unstable connection with frequent failures',
  },
  'timeout-prone': {
    name: 'timeout-prone',
    latency: 5000,
    downloadSpeed: 1024 * 1024, // 1 MB/s
    uploadSpeed: 512 * 1024, // 512 KB/s
    reliability: 0.3,
    timeoutRate: 0.7,
    description: 'Connection that frequently times out',
  },
};

/**
 * Network simulator class
 */
class NetworkSimulator {
  private currentProfile: NetworkProfile = NETWORK_PROFILES.wifi;
  private isSimulating = false;
  private enableLogs = false;
  private requestCount = 0;
  private failureCount = 0;
  private timeoutCount = 0;

  /**
   * Set the network condition for simulation
   */
  setCondition(condition: NetworkCondition, options: { enableLogs?: boolean; customProfile?: Partial<NetworkProfile> } = {}): void {
    this.currentProfile = options.customProfile 
      ? { ...NETWORK_PROFILES[condition], ...options.customProfile }
      : NETWORK_PROFILES[condition];
    this.enableLogs = options.enableLogs ?? false;
    this.isSimulating = true;

    if (this.enableLogs) {
      console.log(`🌐 Network simulation enabled: ${this.currentProfile.description}`);
    }
  }

  /**
   * Disable network simulation (return to normal conditions)
   */
  disable(): void {
    this.isSimulating = false;
    this.currentProfile = NETWORK_PROFILES.wifi;
    
    if (this.enableLogs) {
      console.log('🌐 Network simulation disabled');
    }
  }

  /**
   * Simulate network request with current conditions
   */
  async simulateRequest(requestSize = 1024, responseSize = 1024): Promise<{
    success: boolean;
    duration: number;
    error?: string;
    metadata: {
      requestSize: number;
      responseSize: number;
      effectiveLatency: number;
      simulatedCondition: NetworkCondition;
    };
  }> {
    this.requestCount++;
    const startTime = Date.now();

    if (!this.isSimulating) {
      // No simulation - return immediately
      return {
        success: true,
        duration: 0,
        metadata: {
          requestSize,
          responseSize,
          effectiveLatency: 0,
          simulatedCondition: 'wifi',
        },
      };
    }

    const profile = this.currentProfile;

    // Check for offline condition
    if (profile.name === 'offline') {
      this.failureCount++;
      if (this.enableLogs) {
        console.log('🌐 Request failed: offline');
      }
      return {
        success: false,
        duration: 0,
        error: 'Network offline',
        metadata: {
          requestSize,
          responseSize,
          effectiveLatency: 0,
          simulatedCondition: profile.name,
        },
      };
    }

    // Check for random failure based on reliability
    if (Math.random() > profile.reliability) {
      this.failureCount++;
      if (this.enableLogs) {
        console.log('🌐 Request failed: network error');
      }
      await this.sleep(profile.latency + Math.random() * 1000);
      return {
        success: false,
        duration: Date.now() - startTime,
        error: 'Network error',
        metadata: {
          requestSize,
          responseSize,
          effectiveLatency: profile.latency,
          simulatedCondition: profile.name,
        },
      };
    }

    // Check for timeout
    if (Math.random() < profile.timeoutRate) {
      this.timeoutCount++;
      if (this.enableLogs) {
        console.log('🌐 Request timed out');
      }
      await this.sleep(30000); // 30 second timeout
      return {
        success: false,
        duration: Date.now() - startTime,
        error: 'Request timeout',
        metadata: {
          requestSize,
          responseSize,
          effectiveLatency: profile.latency,
          simulatedCondition: profile.name,
        },
      };
    }

    // Calculate transfer times
    const uploadTime = requestSize > 0 ? (requestSize / profile.uploadSpeed) * 1000 : 0;
    const downloadTime = responseSize > 0 ? (responseSize / profile.downloadSpeed) * 1000 : 0;
    const totalNetworkTime = profile.latency + uploadTime + downloadTime;

    // Add some random variation (±20%)
    const variation = 0.8 + Math.random() * 0.4;
    const actualNetworkTime = totalNetworkTime * variation;

    if (this.enableLogs) {
      console.log(`🌐 Request successful in ${actualNetworkTime.toFixed(0)}ms (${profile.name})`);
    }

    await this.sleep(actualNetworkTime);

    return {
      success: true,
      duration: Date.now() - startTime,
      metadata: {
        requestSize,
        responseSize,
        effectiveLatency: profile.latency * variation,
        simulatedCondition: profile.name,
      },
    };
  }

  /**
   * Simulate file download with progress tracking
   */
  async simulateDownload(
    fileSizeBytes: number,
    onProgress?: (progress: { loaded: number; total: number; percent: number }) => void
  ): Promise<{ success: boolean; duration: number; error?: string }> {
    if (!this.isSimulating || this.currentProfile.name === 'offline') {
      return {
        success: this.currentProfile.name !== 'offline',
        duration: 0,
        error: this.currentProfile.name === 'offline' ? 'Network offline' : undefined,
      };
    }

    const startTime = Date.now();
    const chunkSize = Math.min(64 * 1024, fileSizeBytes / 10); // 64KB chunks or 10% of file
    const totalChunks = Math.ceil(fileSizeBytes / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const currentChunkSize = Math.min(chunkSize, fileSizeBytes - (i * chunkSize));
      const result = await this.simulateRequest(0, currentChunkSize);
      
      if (!result.success) {
        return {
          success: false,
          duration: Date.now() - startTime,
          error: result.error,
        };
      }

      const loaded = (i + 1) * chunkSize;
      if (onProgress) {
        onProgress({
          loaded: Math.min(loaded, fileSizeBytes),
          total: fileSizeBytes,
          percent: Math.min((loaded / fileSizeBytes) * 100, 100),
        });
      }
    }

    return {
      success: true,
      duration: Date.now() - startTime,
    };
  }

  /**
   * Get current simulation statistics
   */
  getStats(): {
    isSimulating: boolean;
    currentCondition: NetworkCondition;
    requestCount: number;
    failureCount: number;
    timeoutCount: number;
    successRate: number;
  } {
    return {
      isSimulating: this.isSimulating,
      currentCondition: this.currentProfile.name,
      requestCount: this.requestCount,
      failureCount: this.failureCount,
      timeoutCount: this.timeoutCount,
      successRate: this.requestCount > 0 ? (this.requestCount - this.failureCount - this.timeoutCount) / this.requestCount : 1,
    };
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.requestCount = 0;
    this.failureCount = 0;
    this.timeoutCount = 0;
  }

  /**
   * Get current profile
   */
  getCurrentProfile(): NetworkProfile {
    return { ...this.currentProfile };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const networkSimulator = new NetworkSimulator();

/**
 * Predefined test scenarios
 */
export const NETWORK_TEST_SCENARIOS = {
  OFFLINE_MODE: {
    condition: 'offline' as const,
    description: 'Test offline behavior',
  },
  SLOW_CONNECTION: {
    condition: 'slow-3g' as const,
    description: 'Test with slow mobile connection',
  },
  UNSTABLE_CONNECTION: {
    condition: 'unstable' as const,
    description: 'Test with unreliable connection',
  },
  TIMEOUT_SCENARIO: {
    condition: 'timeout-prone' as const,
    description: 'Test timeout handling',
  },
  NORMAL_CONDITIONS: {
    condition: 'wifi' as const,
    description: 'Test under normal conditions',
  },
};

/**
 * Helper function to configure network simulation for different test scenarios
 */
export function configureNetworkForTesting(scenario: keyof typeof NETWORK_TEST_SCENARIOS, enableLogs = false): void {
  const config = NETWORK_TEST_SCENARIOS[scenario];
  networkSimulator.setCondition(config.condition, { enableLogs });
}

/**
 * Jest setup helper for network simulation
 */
export function setupNetworkSimulation(): void {
  // Reset before each test
  beforeEach(() => {
    networkSimulator.disable();
    networkSimulator.resetStats();
  });

  // Clean up after tests
  afterAll(() => {
    networkSimulator.disable();
    networkSimulator.resetStats();
  });
}

/**
 * Utility for creating mock fetch with network simulation
 */
export function createSimulatedFetch(): typeof fetch {
  return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = typeof input === 'string' ? input : input.toString();
    const method = init?.method || 'GET';
    const body = init?.body;
    
    // Estimate request/response sizes
    const requestSize = body ? 
      (typeof body === 'string' ? body.length : 
       body instanceof ArrayBuffer ? body.byteLength : 1024) : 
      0;
    const responseSize = 1024; // Default response size

    const result = await networkSimulator.simulateRequest(requestSize, responseSize);
    
    if (!result.success) {
      throw new Error(`Network Error: ${result.error}`);
    }

    // Return mock successful response
    return new Response(JSON.stringify({ 
      success: true, 
      timestamp: new Date().toISOString(),
      simulationMetadata: result.metadata,
    }), {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
}

/**
 * Test helpers for common network testing patterns
 */
export const NETWORK_TEST_HELPERS = {
  /**
   * Test function behavior under different network conditions
   */
  testUnderConditions: async <T>(
    testFn: () => Promise<T>,
    conditions: NetworkCondition[] = ['wifi', 'slow-3g', 'unstable']
  ): Promise<Array<{ condition: NetworkCondition; result: T | Error }>> => {
    const results: Array<{ condition: NetworkCondition; result: T | Error }> = [];

    for (const condition of conditions) {
      networkSimulator.setCondition(condition);
      try {
        const result = await testFn();
        results.push({ condition, result });
      } catch (error) {
        results.push({ condition, result: error as Error });
      }
    }

    networkSimulator.disable();
    return results;
  },

  /**
   * Measure performance under different conditions
   */
  measurePerformance: async (
    testFn: () => Promise<void>,
    condition: NetworkCondition = 'wifi'
  ): Promise<{ duration: number; stats: ReturnType<typeof networkSimulator.getStats> }> => {
    networkSimulator.setCondition(condition);
    networkSimulator.resetStats();

    const startTime = Date.now();
    await testFn();
    const duration = Date.now() - startTime;

    const stats = networkSimulator.getStats();
    networkSimulator.disable();

    return { duration, stats };
  },
};