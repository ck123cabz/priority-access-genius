
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Agreement
 * 
 */
export type Agreement = $Result.DefaultSelection<Prisma.$AgreementPayload>
/**
 * Model AuditEvent
 * 
 */
export type AuditEvent = $Result.DefaultSelection<Prisma.$AuditEventPayload>
/**
 * Model WebhookEndpoint
 * 
 */
export type WebhookEndpoint = $Result.DefaultSelection<Prisma.$WebhookEndpointPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clients
 * const clients = await prisma.client.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agreement`: Exposes CRUD operations for the **Agreement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agreements
    * const agreements = await prisma.agreement.findMany()
    * ```
    */
  get agreement(): Prisma.AgreementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditEvent`: Exposes CRUD operations for the **AuditEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditEvents
    * const auditEvents = await prisma.auditEvent.findMany()
    * ```
    */
  get auditEvent(): Prisma.AuditEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookEndpoint`: Exposes CRUD operations for the **WebhookEndpoint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookEndpoints
    * const webhookEndpoints = await prisma.webhookEndpoint.findMany()
    * ```
    */
  get webhookEndpoint(): Prisma.WebhookEndpointDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Client: 'Client',
    Agreement: 'Agreement',
    AuditEvent: 'AuditEvent',
    WebhookEndpoint: 'WebhookEndpoint'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "client" | "agreement" | "auditEvent" | "webhookEndpoint"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Agreement: {
        payload: Prisma.$AgreementPayload<ExtArgs>
        fields: Prisma.AgreementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgreementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgreementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>
          }
          findFirst: {
            args: Prisma.AgreementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgreementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>
          }
          findMany: {
            args: Prisma.AgreementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>[]
          }
          create: {
            args: Prisma.AgreementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>
          }
          createMany: {
            args: Prisma.AgreementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgreementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>[]
          }
          delete: {
            args: Prisma.AgreementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>
          }
          update: {
            args: Prisma.AgreementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>
          }
          deleteMany: {
            args: Prisma.AgreementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgreementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgreementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>[]
          }
          upsert: {
            args: Prisma.AgreementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgreementPayload>
          }
          aggregate: {
            args: Prisma.AgreementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgreement>
          }
          groupBy: {
            args: Prisma.AgreementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgreementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgreementCountArgs<ExtArgs>
            result: $Utils.Optional<AgreementCountAggregateOutputType> | number
          }
        }
      }
      AuditEvent: {
        payload: Prisma.$AuditEventPayload<ExtArgs>
        fields: Prisma.AuditEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findFirst: {
            args: Prisma.AuditEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          findMany: {
            args: Prisma.AuditEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          create: {
            args: Prisma.AuditEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          createMany: {
            args: Prisma.AuditEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          delete: {
            args: Prisma.AuditEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          update: {
            args: Prisma.AuditEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          deleteMany: {
            args: Prisma.AuditEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>[]
          }
          upsert: {
            args: Prisma.AuditEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditEventPayload>
          }
          aggregate: {
            args: Prisma.AuditEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditEvent>
          }
          groupBy: {
            args: Prisma.AuditEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditEventCountArgs<ExtArgs>
            result: $Utils.Optional<AuditEventCountAggregateOutputType> | number
          }
        }
      }
      WebhookEndpoint: {
        payload: Prisma.$WebhookEndpointPayload<ExtArgs>
        fields: Prisma.WebhookEndpointFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookEndpointFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookEndpointFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          findFirst: {
            args: Prisma.WebhookEndpointFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookEndpointFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          findMany: {
            args: Prisma.WebhookEndpointFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          create: {
            args: Prisma.WebhookEndpointCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          createMany: {
            args: Prisma.WebhookEndpointCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookEndpointCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          delete: {
            args: Prisma.WebhookEndpointDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          update: {
            args: Prisma.WebhookEndpointUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          deleteMany: {
            args: Prisma.WebhookEndpointDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookEndpointUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookEndpointUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>[]
          }
          upsert: {
            args: Prisma.WebhookEndpointUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookEndpointPayload>
          }
          aggregate: {
            args: Prisma.WebhookEndpointAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookEndpoint>
          }
          groupBy: {
            args: Prisma.WebhookEndpointGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookEndpointGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookEndpointCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookEndpointCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    client?: ClientOmit
    agreement?: AgreementOmit
    auditEvent?: AuditEventOmit
    webhookEndpoint?: WebhookEndpointOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    agreements: number
    audit_events: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agreements?: boolean | ClientCountOutputTypeCountAgreementsArgs
    audit_events?: boolean | ClientCountOutputTypeCountAudit_eventsArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountAgreementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgreementWhereInput
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountAudit_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEventWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    company_name: string | null
    contact_name: string | null
    email: string | null
    role_title: string | null
    notes: string | null
    logo_url: string | null
    status: string | null
    created_by: string | null
    activation_token: string | null
    token_expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    company_name: string | null
    contact_name: string | null
    email: string | null
    role_title: string | null
    notes: string | null
    logo_url: string | null
    status: string | null
    created_by: string | null
    activation_token: string | null
    token_expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    company_name: number
    contact_name: number
    email: number
    role_title: number
    notes: number
    logo_url: number
    status: number
    created_by: number
    activation_token: number
    token_expires_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    company_name?: true
    contact_name?: true
    email?: true
    role_title?: true
    notes?: true
    logo_url?: true
    status?: true
    created_by?: true
    activation_token?: true
    token_expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    company_name?: true
    contact_name?: true
    email?: true
    role_title?: true
    notes?: true
    logo_url?: true
    status?: true
    created_by?: true
    activation_token?: true
    token_expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    company_name?: true
    contact_name?: true
    email?: true
    role_title?: true
    notes?: true
    logo_url?: true
    status?: true
    created_by?: true
    activation_token?: true
    token_expires_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes: string | null
    logo_url: string | null
    status: string
    created_by: string
    activation_token: string | null
    token_expires_at: Date | null
    created_at: Date
    updated_at: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_name?: boolean
    contact_name?: boolean
    email?: boolean
    role_title?: boolean
    notes?: boolean
    logo_url?: boolean
    status?: boolean
    created_by?: boolean
    activation_token?: boolean
    token_expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    agreements?: boolean | Client$agreementsArgs<ExtArgs>
    audit_events?: boolean | Client$audit_eventsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>

  export type ClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_name?: boolean
    contact_name?: boolean
    email?: boolean
    role_title?: boolean
    notes?: boolean
    logo_url?: boolean
    status?: boolean
    created_by?: boolean
    activation_token?: boolean
    token_expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    company_name?: boolean
    contact_name?: boolean
    email?: boolean
    role_title?: boolean
    notes?: boolean
    logo_url?: boolean
    status?: boolean
    created_by?: boolean
    activation_token?: boolean
    token_expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["client"]>

  export type ClientSelectScalar = {
    id?: boolean
    company_name?: boolean
    contact_name?: boolean
    email?: boolean
    role_title?: boolean
    notes?: boolean
    logo_url?: boolean
    status?: boolean
    created_by?: boolean
    activation_token?: boolean
    token_expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "company_name" | "contact_name" | "email" | "role_title" | "notes" | "logo_url" | "status" | "created_by" | "activation_token" | "token_expires_at" | "created_at" | "updated_at", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agreements?: boolean | Client$agreementsArgs<ExtArgs>
    audit_events?: boolean | Client$audit_eventsArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      agreements: Prisma.$AgreementPayload<ExtArgs>[]
      audit_events: Prisma.$AuditEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      company_name: string
      contact_name: string
      email: string
      role_title: string
      notes: string | null
      logo_url: string | null
      status: string
      created_by: string
      activation_token: string | null
      token_expires_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agreements<T extends Client$agreementsArgs<ExtArgs> = {}>(args?: Subset<T, Client$agreementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    audit_events<T extends Client$audit_eventsArgs<ExtArgs> = {}>(args?: Subset<T, Client$audit_eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly company_name: FieldRef<"Client", 'String'>
    readonly contact_name: FieldRef<"Client", 'String'>
    readonly email: FieldRef<"Client", 'String'>
    readonly role_title: FieldRef<"Client", 'String'>
    readonly notes: FieldRef<"Client", 'String'>
    readonly logo_url: FieldRef<"Client", 'String'>
    readonly status: FieldRef<"Client", 'String'>
    readonly created_by: FieldRef<"Client", 'String'>
    readonly activation_token: FieldRef<"Client", 'String'>
    readonly token_expires_at: FieldRef<"Client", 'DateTime'>
    readonly created_at: FieldRef<"Client", 'DateTime'>
    readonly updated_at: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.agreements
   */
  export type Client$agreementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    where?: AgreementWhereInput
    orderBy?: AgreementOrderByWithRelationInput | AgreementOrderByWithRelationInput[]
    cursor?: AgreementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgreementScalarFieldEnum | AgreementScalarFieldEnum[]
  }

  /**
   * Client.audit_events
   */
  export type Client$audit_eventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    where?: AuditEventWhereInput
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    cursor?: AuditEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Agreement
   */

  export type AggregateAgreement = {
    _count: AgreementCountAggregateOutputType | null
    _min: AgreementMinAggregateOutputType | null
    _max: AgreementMaxAggregateOutputType | null
  }

  export type AgreementMinAggregateOutputType = {
    id: string | null
    client_id: string | null
    terms_version: string | null
    pdf_url: string | null
    signed_at: Date | null
    signer_name: string | null
    signer_ip: string | null
    signature_hash: string | null
    created_at: Date | null
  }

  export type AgreementMaxAggregateOutputType = {
    id: string | null
    client_id: string | null
    terms_version: string | null
    pdf_url: string | null
    signed_at: Date | null
    signer_name: string | null
    signer_ip: string | null
    signature_hash: string | null
    created_at: Date | null
  }

  export type AgreementCountAggregateOutputType = {
    id: number
    client_id: number
    terms_version: number
    pdf_url: number
    signed_at: number
    signer_name: number
    signer_ip: number
    signature_hash: number
    created_at: number
    _all: number
  }


  export type AgreementMinAggregateInputType = {
    id?: true
    client_id?: true
    terms_version?: true
    pdf_url?: true
    signed_at?: true
    signer_name?: true
    signer_ip?: true
    signature_hash?: true
    created_at?: true
  }

  export type AgreementMaxAggregateInputType = {
    id?: true
    client_id?: true
    terms_version?: true
    pdf_url?: true
    signed_at?: true
    signer_name?: true
    signer_ip?: true
    signature_hash?: true
    created_at?: true
  }

  export type AgreementCountAggregateInputType = {
    id?: true
    client_id?: true
    terms_version?: true
    pdf_url?: true
    signed_at?: true
    signer_name?: true
    signer_ip?: true
    signature_hash?: true
    created_at?: true
    _all?: true
  }

  export type AgreementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agreement to aggregate.
     */
    where?: AgreementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agreements to fetch.
     */
    orderBy?: AgreementOrderByWithRelationInput | AgreementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgreementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agreements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agreements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agreements
    **/
    _count?: true | AgreementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgreementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgreementMaxAggregateInputType
  }

  export type GetAgreementAggregateType<T extends AgreementAggregateArgs> = {
        [P in keyof T & keyof AggregateAgreement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgreement[P]>
      : GetScalarType<T[P], AggregateAgreement[P]>
  }




  export type AgreementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgreementWhereInput
    orderBy?: AgreementOrderByWithAggregationInput | AgreementOrderByWithAggregationInput[]
    by: AgreementScalarFieldEnum[] | AgreementScalarFieldEnum
    having?: AgreementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgreementCountAggregateInputType | true
    _min?: AgreementMinAggregateInputType
    _max?: AgreementMaxAggregateInputType
  }

  export type AgreementGroupByOutputType = {
    id: string
    client_id: string
    terms_version: string
    pdf_url: string | null
    signed_at: Date
    signer_name: string
    signer_ip: string
    signature_hash: string
    created_at: Date
    _count: AgreementCountAggregateOutputType | null
    _min: AgreementMinAggregateOutputType | null
    _max: AgreementMaxAggregateOutputType | null
  }

  type GetAgreementGroupByPayload<T extends AgreementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgreementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgreementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgreementGroupByOutputType[P]>
            : GetScalarType<T[P], AgreementGroupByOutputType[P]>
        }
      >
    >


  export type AgreementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    terms_version?: boolean
    pdf_url?: boolean
    signed_at?: boolean
    signer_name?: boolean
    signer_ip?: boolean
    signature_hash?: boolean
    created_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agreement"]>

  export type AgreementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    terms_version?: boolean
    pdf_url?: boolean
    signed_at?: boolean
    signer_name?: boolean
    signer_ip?: boolean
    signature_hash?: boolean
    created_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agreement"]>

  export type AgreementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    terms_version?: boolean
    pdf_url?: boolean
    signed_at?: boolean
    signer_name?: boolean
    signer_ip?: boolean
    signature_hash?: boolean
    created_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agreement"]>

  export type AgreementSelectScalar = {
    id?: boolean
    client_id?: boolean
    terms_version?: boolean
    pdf_url?: boolean
    signed_at?: boolean
    signer_name?: boolean
    signer_ip?: boolean
    signature_hash?: boolean
    created_at?: boolean
  }

  export type AgreementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "client_id" | "terms_version" | "pdf_url" | "signed_at" | "signer_name" | "signer_ip" | "signature_hash" | "created_at", ExtArgs["result"]["agreement"]>
  export type AgreementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type AgreementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type AgreementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $AgreementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agreement"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      client_id: string
      terms_version: string
      pdf_url: string | null
      signed_at: Date
      signer_name: string
      signer_ip: string
      signature_hash: string
      created_at: Date
    }, ExtArgs["result"]["agreement"]>
    composites: {}
  }

  type AgreementGetPayload<S extends boolean | null | undefined | AgreementDefaultArgs> = $Result.GetResult<Prisma.$AgreementPayload, S>

  type AgreementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgreementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgreementCountAggregateInputType | true
    }

  export interface AgreementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agreement'], meta: { name: 'Agreement' } }
    /**
     * Find zero or one Agreement that matches the filter.
     * @param {AgreementFindUniqueArgs} args - Arguments to find a Agreement
     * @example
     * // Get one Agreement
     * const agreement = await prisma.agreement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgreementFindUniqueArgs>(args: SelectSubset<T, AgreementFindUniqueArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agreement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgreementFindUniqueOrThrowArgs} args - Arguments to find a Agreement
     * @example
     * // Get one Agreement
     * const agreement = await prisma.agreement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgreementFindUniqueOrThrowArgs>(args: SelectSubset<T, AgreementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agreement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgreementFindFirstArgs} args - Arguments to find a Agreement
     * @example
     * // Get one Agreement
     * const agreement = await prisma.agreement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgreementFindFirstArgs>(args?: SelectSubset<T, AgreementFindFirstArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agreement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgreementFindFirstOrThrowArgs} args - Arguments to find a Agreement
     * @example
     * // Get one Agreement
     * const agreement = await prisma.agreement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgreementFindFirstOrThrowArgs>(args?: SelectSubset<T, AgreementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agreements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgreementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agreements
     * const agreements = await prisma.agreement.findMany()
     * 
     * // Get first 10 Agreements
     * const agreements = await prisma.agreement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agreementWithIdOnly = await prisma.agreement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgreementFindManyArgs>(args?: SelectSubset<T, AgreementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agreement.
     * @param {AgreementCreateArgs} args - Arguments to create a Agreement.
     * @example
     * // Create one Agreement
     * const Agreement = await prisma.agreement.create({
     *   data: {
     *     // ... data to create a Agreement
     *   }
     * })
     * 
     */
    create<T extends AgreementCreateArgs>(args: SelectSubset<T, AgreementCreateArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agreements.
     * @param {AgreementCreateManyArgs} args - Arguments to create many Agreements.
     * @example
     * // Create many Agreements
     * const agreement = await prisma.agreement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgreementCreateManyArgs>(args?: SelectSubset<T, AgreementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agreements and returns the data saved in the database.
     * @param {AgreementCreateManyAndReturnArgs} args - Arguments to create many Agreements.
     * @example
     * // Create many Agreements
     * const agreement = await prisma.agreement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agreements and only return the `id`
     * const agreementWithIdOnly = await prisma.agreement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgreementCreateManyAndReturnArgs>(args?: SelectSubset<T, AgreementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agreement.
     * @param {AgreementDeleteArgs} args - Arguments to delete one Agreement.
     * @example
     * // Delete one Agreement
     * const Agreement = await prisma.agreement.delete({
     *   where: {
     *     // ... filter to delete one Agreement
     *   }
     * })
     * 
     */
    delete<T extends AgreementDeleteArgs>(args: SelectSubset<T, AgreementDeleteArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agreement.
     * @param {AgreementUpdateArgs} args - Arguments to update one Agreement.
     * @example
     * // Update one Agreement
     * const agreement = await prisma.agreement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgreementUpdateArgs>(args: SelectSubset<T, AgreementUpdateArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agreements.
     * @param {AgreementDeleteManyArgs} args - Arguments to filter Agreements to delete.
     * @example
     * // Delete a few Agreements
     * const { count } = await prisma.agreement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgreementDeleteManyArgs>(args?: SelectSubset<T, AgreementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agreements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgreementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agreements
     * const agreement = await prisma.agreement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgreementUpdateManyArgs>(args: SelectSubset<T, AgreementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agreements and returns the data updated in the database.
     * @param {AgreementUpdateManyAndReturnArgs} args - Arguments to update many Agreements.
     * @example
     * // Update many Agreements
     * const agreement = await prisma.agreement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agreements and only return the `id`
     * const agreementWithIdOnly = await prisma.agreement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgreementUpdateManyAndReturnArgs>(args: SelectSubset<T, AgreementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agreement.
     * @param {AgreementUpsertArgs} args - Arguments to update or create a Agreement.
     * @example
     * // Update or create a Agreement
     * const agreement = await prisma.agreement.upsert({
     *   create: {
     *     // ... data to create a Agreement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agreement we want to update
     *   }
     * })
     */
    upsert<T extends AgreementUpsertArgs>(args: SelectSubset<T, AgreementUpsertArgs<ExtArgs>>): Prisma__AgreementClient<$Result.GetResult<Prisma.$AgreementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agreements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgreementCountArgs} args - Arguments to filter Agreements to count.
     * @example
     * // Count the number of Agreements
     * const count = await prisma.agreement.count({
     *   where: {
     *     // ... the filter for the Agreements we want to count
     *   }
     * })
    **/
    count<T extends AgreementCountArgs>(
      args?: Subset<T, AgreementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgreementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agreement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgreementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgreementAggregateArgs>(args: Subset<T, AgreementAggregateArgs>): Prisma.PrismaPromise<GetAgreementAggregateType<T>>

    /**
     * Group by Agreement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgreementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgreementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgreementGroupByArgs['orderBy'] }
        : { orderBy?: AgreementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgreementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgreementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agreement model
   */
  readonly fields: AgreementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agreement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgreementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agreement model
   */
  interface AgreementFieldRefs {
    readonly id: FieldRef<"Agreement", 'String'>
    readonly client_id: FieldRef<"Agreement", 'String'>
    readonly terms_version: FieldRef<"Agreement", 'String'>
    readonly pdf_url: FieldRef<"Agreement", 'String'>
    readonly signed_at: FieldRef<"Agreement", 'DateTime'>
    readonly signer_name: FieldRef<"Agreement", 'String'>
    readonly signer_ip: FieldRef<"Agreement", 'String'>
    readonly signature_hash: FieldRef<"Agreement", 'String'>
    readonly created_at: FieldRef<"Agreement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agreement findUnique
   */
  export type AgreementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * Filter, which Agreement to fetch.
     */
    where: AgreementWhereUniqueInput
  }

  /**
   * Agreement findUniqueOrThrow
   */
  export type AgreementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * Filter, which Agreement to fetch.
     */
    where: AgreementWhereUniqueInput
  }

  /**
   * Agreement findFirst
   */
  export type AgreementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * Filter, which Agreement to fetch.
     */
    where?: AgreementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agreements to fetch.
     */
    orderBy?: AgreementOrderByWithRelationInput | AgreementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agreements.
     */
    cursor?: AgreementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agreements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agreements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agreements.
     */
    distinct?: AgreementScalarFieldEnum | AgreementScalarFieldEnum[]
  }

  /**
   * Agreement findFirstOrThrow
   */
  export type AgreementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * Filter, which Agreement to fetch.
     */
    where?: AgreementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agreements to fetch.
     */
    orderBy?: AgreementOrderByWithRelationInput | AgreementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agreements.
     */
    cursor?: AgreementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agreements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agreements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agreements.
     */
    distinct?: AgreementScalarFieldEnum | AgreementScalarFieldEnum[]
  }

  /**
   * Agreement findMany
   */
  export type AgreementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * Filter, which Agreements to fetch.
     */
    where?: AgreementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agreements to fetch.
     */
    orderBy?: AgreementOrderByWithRelationInput | AgreementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agreements.
     */
    cursor?: AgreementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agreements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agreements.
     */
    skip?: number
    distinct?: AgreementScalarFieldEnum | AgreementScalarFieldEnum[]
  }

  /**
   * Agreement create
   */
  export type AgreementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * The data needed to create a Agreement.
     */
    data: XOR<AgreementCreateInput, AgreementUncheckedCreateInput>
  }

  /**
   * Agreement createMany
   */
  export type AgreementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agreements.
     */
    data: AgreementCreateManyInput | AgreementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Agreement createManyAndReturn
   */
  export type AgreementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * The data used to create many Agreements.
     */
    data: AgreementCreateManyInput | AgreementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agreement update
   */
  export type AgreementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * The data needed to update a Agreement.
     */
    data: XOR<AgreementUpdateInput, AgreementUncheckedUpdateInput>
    /**
     * Choose, which Agreement to update.
     */
    where: AgreementWhereUniqueInput
  }

  /**
   * Agreement updateMany
   */
  export type AgreementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agreements.
     */
    data: XOR<AgreementUpdateManyMutationInput, AgreementUncheckedUpdateManyInput>
    /**
     * Filter which Agreements to update
     */
    where?: AgreementWhereInput
    /**
     * Limit how many Agreements to update.
     */
    limit?: number
  }

  /**
   * Agreement updateManyAndReturn
   */
  export type AgreementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * The data used to update Agreements.
     */
    data: XOR<AgreementUpdateManyMutationInput, AgreementUncheckedUpdateManyInput>
    /**
     * Filter which Agreements to update
     */
    where?: AgreementWhereInput
    /**
     * Limit how many Agreements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agreement upsert
   */
  export type AgreementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * The filter to search for the Agreement to update in case it exists.
     */
    where: AgreementWhereUniqueInput
    /**
     * In case the Agreement found by the `where` argument doesn't exist, create a new Agreement with this data.
     */
    create: XOR<AgreementCreateInput, AgreementUncheckedCreateInput>
    /**
     * In case the Agreement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgreementUpdateInput, AgreementUncheckedUpdateInput>
  }

  /**
   * Agreement delete
   */
  export type AgreementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
    /**
     * Filter which Agreement to delete.
     */
    where: AgreementWhereUniqueInput
  }

  /**
   * Agreement deleteMany
   */
  export type AgreementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agreements to delete
     */
    where?: AgreementWhereInput
    /**
     * Limit how many Agreements to delete.
     */
    limit?: number
  }

  /**
   * Agreement without action
   */
  export type AgreementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agreement
     */
    select?: AgreementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agreement
     */
    omit?: AgreementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgreementInclude<ExtArgs> | null
  }


  /**
   * Model AuditEvent
   */

  export type AggregateAuditEvent = {
    _count: AuditEventCountAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  export type AuditEventMinAggregateOutputType = {
    id: string | null
    client_id: string | null
    actor: string | null
    action: string | null
    created_at: Date | null
  }

  export type AuditEventMaxAggregateOutputType = {
    id: string | null
    client_id: string | null
    actor: string | null
    action: string | null
    created_at: Date | null
  }

  export type AuditEventCountAggregateOutputType = {
    id: number
    client_id: number
    actor: number
    action: number
    payload: number
    created_at: number
    _all: number
  }


  export type AuditEventMinAggregateInputType = {
    id?: true
    client_id?: true
    actor?: true
    action?: true
    created_at?: true
  }

  export type AuditEventMaxAggregateInputType = {
    id?: true
    client_id?: true
    actor?: true
    action?: true
    created_at?: true
  }

  export type AuditEventCountAggregateInputType = {
    id?: true
    client_id?: true
    actor?: true
    action?: true
    payload?: true
    created_at?: true
    _all?: true
  }

  export type AuditEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvent to aggregate.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditEvents
    **/
    _count?: true | AuditEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditEventMaxAggregateInputType
  }

  export type GetAuditEventAggregateType<T extends AuditEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditEvent[P]>
      : GetScalarType<T[P], AggregateAuditEvent[P]>
  }




  export type AuditEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditEventWhereInput
    orderBy?: AuditEventOrderByWithAggregationInput | AuditEventOrderByWithAggregationInput[]
    by: AuditEventScalarFieldEnum[] | AuditEventScalarFieldEnum
    having?: AuditEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditEventCountAggregateInputType | true
    _min?: AuditEventMinAggregateInputType
    _max?: AuditEventMaxAggregateInputType
  }

  export type AuditEventGroupByOutputType = {
    id: string
    client_id: string
    actor: string
    action: string
    payload: JsonValue
    created_at: Date
    _count: AuditEventCountAggregateOutputType | null
    _min: AuditEventMinAggregateOutputType | null
    _max: AuditEventMaxAggregateOutputType | null
  }

  type GetAuditEventGroupByPayload<T extends AuditEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
            : GetScalarType<T[P], AuditEventGroupByOutputType[P]>
        }
      >
    >


  export type AuditEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    actor?: boolean
    action?: boolean
    payload?: boolean
    created_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    actor?: boolean
    action?: boolean
    payload?: boolean
    created_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    actor?: boolean
    action?: boolean
    payload?: boolean
    created_at?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditEvent"]>

  export type AuditEventSelectScalar = {
    id?: boolean
    client_id?: boolean
    actor?: boolean
    action?: boolean
    payload?: boolean
    created_at?: boolean
  }

  export type AuditEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "client_id" | "actor" | "action" | "payload" | "created_at", ExtArgs["result"]["auditEvent"]>
  export type AuditEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type AuditEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }
  export type AuditEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
  }

  export type $AuditEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditEvent"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      client_id: string
      actor: string
      action: string
      payload: Prisma.JsonValue
      created_at: Date
    }, ExtArgs["result"]["auditEvent"]>
    composites: {}
  }

  type AuditEventGetPayload<S extends boolean | null | undefined | AuditEventDefaultArgs> = $Result.GetResult<Prisma.$AuditEventPayload, S>

  type AuditEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditEventCountAggregateInputType | true
    }

  export interface AuditEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditEvent'], meta: { name: 'AuditEvent' } }
    /**
     * Find zero or one AuditEvent that matches the filter.
     * @param {AuditEventFindUniqueArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditEventFindUniqueArgs>(args: SelectSubset<T, AuditEventFindUniqueArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditEventFindUniqueOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditEventFindFirstArgs>(args?: SelectSubset<T, AuditEventFindFirstArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindFirstOrThrowArgs} args - Arguments to find a AuditEvent
     * @example
     * // Get one AuditEvent
     * const auditEvent = await prisma.auditEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany()
     * 
     * // Get first 10 AuditEvents
     * const auditEvents = await prisma.auditEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditEventFindManyArgs>(args?: SelectSubset<T, AuditEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditEvent.
     * @param {AuditEventCreateArgs} args - Arguments to create a AuditEvent.
     * @example
     * // Create one AuditEvent
     * const AuditEvent = await prisma.auditEvent.create({
     *   data: {
     *     // ... data to create a AuditEvent
     *   }
     * })
     * 
     */
    create<T extends AuditEventCreateArgs>(args: SelectSubset<T, AuditEventCreateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditEvents.
     * @param {AuditEventCreateManyArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditEventCreateManyArgs>(args?: SelectSubset<T, AuditEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditEvents and returns the data saved in the database.
     * @param {AuditEventCreateManyAndReturnArgs} args - Arguments to create many AuditEvents.
     * @example
     * // Create many AuditEvents
     * const auditEvent = await prisma.auditEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditEvents and only return the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditEvent.
     * @param {AuditEventDeleteArgs} args - Arguments to delete one AuditEvent.
     * @example
     * // Delete one AuditEvent
     * const AuditEvent = await prisma.auditEvent.delete({
     *   where: {
     *     // ... filter to delete one AuditEvent
     *   }
     * })
     * 
     */
    delete<T extends AuditEventDeleteArgs>(args: SelectSubset<T, AuditEventDeleteArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditEvent.
     * @param {AuditEventUpdateArgs} args - Arguments to update one AuditEvent.
     * @example
     * // Update one AuditEvent
     * const auditEvent = await prisma.auditEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditEventUpdateArgs>(args: SelectSubset<T, AuditEventUpdateArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditEvents.
     * @param {AuditEventDeleteManyArgs} args - Arguments to filter AuditEvents to delete.
     * @example
     * // Delete a few AuditEvents
     * const { count } = await prisma.auditEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditEventDeleteManyArgs>(args?: SelectSubset<T, AuditEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditEvents
     * const auditEvent = await prisma.auditEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditEventUpdateManyArgs>(args: SelectSubset<T, AuditEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditEvents and returns the data updated in the database.
     * @param {AuditEventUpdateManyAndReturnArgs} args - Arguments to update many AuditEvents.
     * @example
     * // Update many AuditEvents
     * const auditEvent = await prisma.auditEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditEvents and only return the `id`
     * const auditEventWithIdOnly = await prisma.auditEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditEventUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditEvent.
     * @param {AuditEventUpsertArgs} args - Arguments to update or create a AuditEvent.
     * @example
     * // Update or create a AuditEvent
     * const auditEvent = await prisma.auditEvent.upsert({
     *   create: {
     *     // ... data to create a AuditEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditEvent we want to update
     *   }
     * })
     */
    upsert<T extends AuditEventUpsertArgs>(args: SelectSubset<T, AuditEventUpsertArgs<ExtArgs>>): Prisma__AuditEventClient<$Result.GetResult<Prisma.$AuditEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventCountArgs} args - Arguments to filter AuditEvents to count.
     * @example
     * // Count the number of AuditEvents
     * const count = await prisma.auditEvent.count({
     *   where: {
     *     // ... the filter for the AuditEvents we want to count
     *   }
     * })
    **/
    count<T extends AuditEventCountArgs>(
      args?: Subset<T, AuditEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditEventAggregateArgs>(args: Subset<T, AuditEventAggregateArgs>): Prisma.PrismaPromise<GetAuditEventAggregateType<T>>

    /**
     * Group by AuditEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditEventGroupByArgs['orderBy'] }
        : { orderBy?: AuditEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditEvent model
   */
  readonly fields: AuditEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditEvent model
   */
  interface AuditEventFieldRefs {
    readonly id: FieldRef<"AuditEvent", 'String'>
    readonly client_id: FieldRef<"AuditEvent", 'String'>
    readonly actor: FieldRef<"AuditEvent", 'String'>
    readonly action: FieldRef<"AuditEvent", 'String'>
    readonly payload: FieldRef<"AuditEvent", 'Json'>
    readonly created_at: FieldRef<"AuditEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditEvent findUnique
   */
  export type AuditEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findUniqueOrThrow
   */
  export type AuditEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent findFirst
   */
  export type AuditEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findFirstOrThrow
   */
  export type AuditEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvent to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditEvents.
     */
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent findMany
   */
  export type AuditEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter, which AuditEvents to fetch.
     */
    where?: AuditEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditEvents to fetch.
     */
    orderBy?: AuditEventOrderByWithRelationInput | AuditEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditEvents.
     */
    cursor?: AuditEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditEvents.
     */
    skip?: number
    distinct?: AuditEventScalarFieldEnum | AuditEventScalarFieldEnum[]
  }

  /**
   * AuditEvent create
   */
  export type AuditEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditEvent.
     */
    data: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
  }

  /**
   * AuditEvent createMany
   */
  export type AuditEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditEvent createManyAndReturn
   */
  export type AuditEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data used to create many AuditEvents.
     */
    data: AuditEventCreateManyInput | AuditEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditEvent update
   */
  export type AuditEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditEvent.
     */
    data: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
    /**
     * Choose, which AuditEvent to update.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent updateMany
   */
  export type AuditEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditEvents.
     */
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyInput>
    /**
     * Filter which AuditEvents to update
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to update.
     */
    limit?: number
  }

  /**
   * AuditEvent updateManyAndReturn
   */
  export type AuditEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * The data used to update AuditEvents.
     */
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyInput>
    /**
     * Filter which AuditEvents to update
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditEvent upsert
   */
  export type AuditEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditEvent to update in case it exists.
     */
    where: AuditEventWhereUniqueInput
    /**
     * In case the AuditEvent found by the `where` argument doesn't exist, create a new AuditEvent with this data.
     */
    create: XOR<AuditEventCreateInput, AuditEventUncheckedCreateInput>
    /**
     * In case the AuditEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditEventUpdateInput, AuditEventUncheckedUpdateInput>
  }

  /**
   * AuditEvent delete
   */
  export type AuditEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
    /**
     * Filter which AuditEvent to delete.
     */
    where: AuditEventWhereUniqueInput
  }

  /**
   * AuditEvent deleteMany
   */
  export type AuditEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditEvents to delete
     */
    where?: AuditEventWhereInput
    /**
     * Limit how many AuditEvents to delete.
     */
    limit?: number
  }

  /**
   * AuditEvent without action
   */
  export type AuditEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditEvent
     */
    select?: AuditEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditEvent
     */
    omit?: AuditEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditEventInclude<ExtArgs> | null
  }


  /**
   * Model WebhookEndpoint
   */

  export type AggregateWebhookEndpoint = {
    _count: WebhookEndpointCountAggregateOutputType | null
    _min: WebhookEndpointMinAggregateOutputType | null
    _max: WebhookEndpointMaxAggregateOutputType | null
  }

  export type WebhookEndpointMinAggregateOutputType = {
    id: string | null
    url: string | null
    secret: string | null
    enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WebhookEndpointMaxAggregateOutputType = {
    id: string | null
    url: string | null
    secret: string | null
    enabled: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WebhookEndpointCountAggregateOutputType = {
    id: number
    url: number
    secret: number
    enabled: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type WebhookEndpointMinAggregateInputType = {
    id?: true
    url?: true
    secret?: true
    enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type WebhookEndpointMaxAggregateInputType = {
    id?: true
    url?: true
    secret?: true
    enabled?: true
    created_at?: true
    updated_at?: true
  }

  export type WebhookEndpointCountAggregateInputType = {
    id?: true
    url?: true
    secret?: true
    enabled?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type WebhookEndpointAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEndpoint to aggregate.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookEndpoints
    **/
    _count?: true | WebhookEndpointCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookEndpointMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookEndpointMaxAggregateInputType
  }

  export type GetWebhookEndpointAggregateType<T extends WebhookEndpointAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookEndpoint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookEndpoint[P]>
      : GetScalarType<T[P], AggregateWebhookEndpoint[P]>
  }




  export type WebhookEndpointGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookEndpointWhereInput
    orderBy?: WebhookEndpointOrderByWithAggregationInput | WebhookEndpointOrderByWithAggregationInput[]
    by: WebhookEndpointScalarFieldEnum[] | WebhookEndpointScalarFieldEnum
    having?: WebhookEndpointScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookEndpointCountAggregateInputType | true
    _min?: WebhookEndpointMinAggregateInputType
    _max?: WebhookEndpointMaxAggregateInputType
  }

  export type WebhookEndpointGroupByOutputType = {
    id: string
    url: string
    secret: string
    enabled: boolean
    created_at: Date
    updated_at: Date
    _count: WebhookEndpointCountAggregateOutputType | null
    _min: WebhookEndpointMinAggregateOutputType | null
    _max: WebhookEndpointMaxAggregateOutputType | null
  }

  type GetWebhookEndpointGroupByPayload<T extends WebhookEndpointGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookEndpointGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookEndpointGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookEndpointGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookEndpointGroupByOutputType[P]>
        }
      >
    >


  export type WebhookEndpointSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    secret?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    secret?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    url?: boolean
    secret?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["webhookEndpoint"]>

  export type WebhookEndpointSelectScalar = {
    id?: boolean
    url?: boolean
    secret?: boolean
    enabled?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type WebhookEndpointOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "url" | "secret" | "enabled" | "created_at" | "updated_at", ExtArgs["result"]["webhookEndpoint"]>

  export type $WebhookEndpointPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookEndpoint"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      url: string
      secret: string
      enabled: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["webhookEndpoint"]>
    composites: {}
  }

  type WebhookEndpointGetPayload<S extends boolean | null | undefined | WebhookEndpointDefaultArgs> = $Result.GetResult<Prisma.$WebhookEndpointPayload, S>

  type WebhookEndpointCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookEndpointFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookEndpointCountAggregateInputType | true
    }

  export interface WebhookEndpointDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookEndpoint'], meta: { name: 'WebhookEndpoint' } }
    /**
     * Find zero or one WebhookEndpoint that matches the filter.
     * @param {WebhookEndpointFindUniqueArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookEndpointFindUniqueArgs>(args: SelectSubset<T, WebhookEndpointFindUniqueArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookEndpoint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookEndpointFindUniqueOrThrowArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookEndpointFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookEndpointFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEndpoint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindFirstArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookEndpointFindFirstArgs>(args?: SelectSubset<T, WebhookEndpointFindFirstArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookEndpoint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindFirstOrThrowArgs} args - Arguments to find a WebhookEndpoint
     * @example
     * // Get one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookEndpointFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookEndpointFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookEndpoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookEndpoints
     * const webhookEndpoints = await prisma.webhookEndpoint.findMany()
     * 
     * // Get first 10 WebhookEndpoints
     * const webhookEndpoints = await prisma.webhookEndpoint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookEndpointFindManyArgs>(args?: SelectSubset<T, WebhookEndpointFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookEndpoint.
     * @param {WebhookEndpointCreateArgs} args - Arguments to create a WebhookEndpoint.
     * @example
     * // Create one WebhookEndpoint
     * const WebhookEndpoint = await prisma.webhookEndpoint.create({
     *   data: {
     *     // ... data to create a WebhookEndpoint
     *   }
     * })
     * 
     */
    create<T extends WebhookEndpointCreateArgs>(args: SelectSubset<T, WebhookEndpointCreateArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookEndpoints.
     * @param {WebhookEndpointCreateManyArgs} args - Arguments to create many WebhookEndpoints.
     * @example
     * // Create many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookEndpointCreateManyArgs>(args?: SelectSubset<T, WebhookEndpointCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookEndpoints and returns the data saved in the database.
     * @param {WebhookEndpointCreateManyAndReturnArgs} args - Arguments to create many WebhookEndpoints.
     * @example
     * // Create many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookEndpoints and only return the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookEndpointCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookEndpointCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookEndpoint.
     * @param {WebhookEndpointDeleteArgs} args - Arguments to delete one WebhookEndpoint.
     * @example
     * // Delete one WebhookEndpoint
     * const WebhookEndpoint = await prisma.webhookEndpoint.delete({
     *   where: {
     *     // ... filter to delete one WebhookEndpoint
     *   }
     * })
     * 
     */
    delete<T extends WebhookEndpointDeleteArgs>(args: SelectSubset<T, WebhookEndpointDeleteArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookEndpoint.
     * @param {WebhookEndpointUpdateArgs} args - Arguments to update one WebhookEndpoint.
     * @example
     * // Update one WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookEndpointUpdateArgs>(args: SelectSubset<T, WebhookEndpointUpdateArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookEndpoints.
     * @param {WebhookEndpointDeleteManyArgs} args - Arguments to filter WebhookEndpoints to delete.
     * @example
     * // Delete a few WebhookEndpoints
     * const { count } = await prisma.webhookEndpoint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookEndpointDeleteManyArgs>(args?: SelectSubset<T, WebhookEndpointDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookEndpointUpdateManyArgs>(args: SelectSubset<T, WebhookEndpointUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookEndpoints and returns the data updated in the database.
     * @param {WebhookEndpointUpdateManyAndReturnArgs} args - Arguments to update many WebhookEndpoints.
     * @example
     * // Update many WebhookEndpoints
     * const webhookEndpoint = await prisma.webhookEndpoint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookEndpoints and only return the `id`
     * const webhookEndpointWithIdOnly = await prisma.webhookEndpoint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookEndpointUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookEndpointUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookEndpoint.
     * @param {WebhookEndpointUpsertArgs} args - Arguments to update or create a WebhookEndpoint.
     * @example
     * // Update or create a WebhookEndpoint
     * const webhookEndpoint = await prisma.webhookEndpoint.upsert({
     *   create: {
     *     // ... data to create a WebhookEndpoint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookEndpoint we want to update
     *   }
     * })
     */
    upsert<T extends WebhookEndpointUpsertArgs>(args: SelectSubset<T, WebhookEndpointUpsertArgs<ExtArgs>>): Prisma__WebhookEndpointClient<$Result.GetResult<Prisma.$WebhookEndpointPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookEndpoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointCountArgs} args - Arguments to filter WebhookEndpoints to count.
     * @example
     * // Count the number of WebhookEndpoints
     * const count = await prisma.webhookEndpoint.count({
     *   where: {
     *     // ... the filter for the WebhookEndpoints we want to count
     *   }
     * })
    **/
    count<T extends WebhookEndpointCountArgs>(
      args?: Subset<T, WebhookEndpointCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookEndpointCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookEndpointAggregateArgs>(args: Subset<T, WebhookEndpointAggregateArgs>): Prisma.PrismaPromise<GetWebhookEndpointAggregateType<T>>

    /**
     * Group by WebhookEndpoint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookEndpointGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookEndpointGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookEndpointGroupByArgs['orderBy'] }
        : { orderBy?: WebhookEndpointGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookEndpointGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookEndpointGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookEndpoint model
   */
  readonly fields: WebhookEndpointFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookEndpoint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookEndpointClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookEndpoint model
   */
  interface WebhookEndpointFieldRefs {
    readonly id: FieldRef<"WebhookEndpoint", 'String'>
    readonly url: FieldRef<"WebhookEndpoint", 'String'>
    readonly secret: FieldRef<"WebhookEndpoint", 'String'>
    readonly enabled: FieldRef<"WebhookEndpoint", 'Boolean'>
    readonly created_at: FieldRef<"WebhookEndpoint", 'DateTime'>
    readonly updated_at: FieldRef<"WebhookEndpoint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookEndpoint findUnique
   */
  export type WebhookEndpointFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint findUniqueOrThrow
   */
  export type WebhookEndpointFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint findFirst
   */
  export type WebhookEndpointFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEndpoints.
     */
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint findFirstOrThrow
   */
  export type WebhookEndpointFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoint to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookEndpoints.
     */
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint findMany
   */
  export type WebhookEndpointFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Filter, which WebhookEndpoints to fetch.
     */
    where?: WebhookEndpointWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookEndpoints to fetch.
     */
    orderBy?: WebhookEndpointOrderByWithRelationInput | WebhookEndpointOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookEndpoints.
     */
    cursor?: WebhookEndpointWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookEndpoints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookEndpoints.
     */
    skip?: number
    distinct?: WebhookEndpointScalarFieldEnum | WebhookEndpointScalarFieldEnum[]
  }

  /**
   * WebhookEndpoint create
   */
  export type WebhookEndpointCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * The data needed to create a WebhookEndpoint.
     */
    data: XOR<WebhookEndpointCreateInput, WebhookEndpointUncheckedCreateInput>
  }

  /**
   * WebhookEndpoint createMany
   */
  export type WebhookEndpointCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookEndpoints.
     */
    data: WebhookEndpointCreateManyInput | WebhookEndpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEndpoint createManyAndReturn
   */
  export type WebhookEndpointCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookEndpoints.
     */
    data: WebhookEndpointCreateManyInput | WebhookEndpointCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WebhookEndpoint update
   */
  export type WebhookEndpointUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * The data needed to update a WebhookEndpoint.
     */
    data: XOR<WebhookEndpointUpdateInput, WebhookEndpointUncheckedUpdateInput>
    /**
     * Choose, which WebhookEndpoint to update.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint updateMany
   */
  export type WebhookEndpointUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookEndpoints.
     */
    data: XOR<WebhookEndpointUpdateManyMutationInput, WebhookEndpointUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEndpoints to update
     */
    where?: WebhookEndpointWhereInput
    /**
     * Limit how many WebhookEndpoints to update.
     */
    limit?: number
  }

  /**
   * WebhookEndpoint updateManyAndReturn
   */
  export type WebhookEndpointUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * The data used to update WebhookEndpoints.
     */
    data: XOR<WebhookEndpointUpdateManyMutationInput, WebhookEndpointUncheckedUpdateManyInput>
    /**
     * Filter which WebhookEndpoints to update
     */
    where?: WebhookEndpointWhereInput
    /**
     * Limit how many WebhookEndpoints to update.
     */
    limit?: number
  }

  /**
   * WebhookEndpoint upsert
   */
  export type WebhookEndpointUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * The filter to search for the WebhookEndpoint to update in case it exists.
     */
    where: WebhookEndpointWhereUniqueInput
    /**
     * In case the WebhookEndpoint found by the `where` argument doesn't exist, create a new WebhookEndpoint with this data.
     */
    create: XOR<WebhookEndpointCreateInput, WebhookEndpointUncheckedCreateInput>
    /**
     * In case the WebhookEndpoint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookEndpointUpdateInput, WebhookEndpointUncheckedUpdateInput>
  }

  /**
   * WebhookEndpoint delete
   */
  export type WebhookEndpointDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
    /**
     * Filter which WebhookEndpoint to delete.
     */
    where: WebhookEndpointWhereUniqueInput
  }

  /**
   * WebhookEndpoint deleteMany
   */
  export type WebhookEndpointDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookEndpoints to delete
     */
    where?: WebhookEndpointWhereInput
    /**
     * Limit how many WebhookEndpoints to delete.
     */
    limit?: number
  }

  /**
   * WebhookEndpoint without action
   */
  export type WebhookEndpointDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookEndpoint
     */
    select?: WebhookEndpointSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookEndpoint
     */
    omit?: WebhookEndpointOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClientScalarFieldEnum: {
    id: 'id',
    company_name: 'company_name',
    contact_name: 'contact_name',
    email: 'email',
    role_title: 'role_title',
    notes: 'notes',
    logo_url: 'logo_url',
    status: 'status',
    created_by: 'created_by',
    activation_token: 'activation_token',
    token_expires_at: 'token_expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const AgreementScalarFieldEnum: {
    id: 'id',
    client_id: 'client_id',
    terms_version: 'terms_version',
    pdf_url: 'pdf_url',
    signed_at: 'signed_at',
    signer_name: 'signer_name',
    signer_ip: 'signer_ip',
    signature_hash: 'signature_hash',
    created_at: 'created_at'
  };

  export type AgreementScalarFieldEnum = (typeof AgreementScalarFieldEnum)[keyof typeof AgreementScalarFieldEnum]


  export const AuditEventScalarFieldEnum: {
    id: 'id',
    client_id: 'client_id',
    actor: 'actor',
    action: 'action',
    payload: 'payload',
    created_at: 'created_at'
  };

  export type AuditEventScalarFieldEnum = (typeof AuditEventScalarFieldEnum)[keyof typeof AuditEventScalarFieldEnum]


  export const WebhookEndpointScalarFieldEnum: {
    id: 'id',
    url: 'url',
    secret: 'secret',
    enabled: 'enabled',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type WebhookEndpointScalarFieldEnum = (typeof WebhookEndpointScalarFieldEnum)[keyof typeof WebhookEndpointScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    company_name?: StringFilter<"Client"> | string
    contact_name?: StringFilter<"Client"> | string
    email?: StringFilter<"Client"> | string
    role_title?: StringFilter<"Client"> | string
    notes?: StringNullableFilter<"Client"> | string | null
    logo_url?: StringNullableFilter<"Client"> | string | null
    status?: StringFilter<"Client"> | string
    created_by?: StringFilter<"Client"> | string
    activation_token?: StringNullableFilter<"Client"> | string | null
    token_expires_at?: DateTimeNullableFilter<"Client"> | Date | string | null
    created_at?: DateTimeFilter<"Client"> | Date | string
    updated_at?: DateTimeFilter<"Client"> | Date | string
    agreements?: AgreementListRelationFilter
    audit_events?: AuditEventListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    company_name?: SortOrder
    contact_name?: SortOrder
    email?: SortOrder
    role_title?: SortOrder
    notes?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    status?: SortOrder
    created_by?: SortOrder
    activation_token?: SortOrderInput | SortOrder
    token_expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    agreements?: AgreementOrderByRelationAggregateInput
    audit_events?: AuditEventOrderByRelationAggregateInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    company_name?: StringFilter<"Client"> | string
    contact_name?: StringFilter<"Client"> | string
    role_title?: StringFilter<"Client"> | string
    notes?: StringNullableFilter<"Client"> | string | null
    logo_url?: StringNullableFilter<"Client"> | string | null
    status?: StringFilter<"Client"> | string
    created_by?: StringFilter<"Client"> | string
    activation_token?: StringNullableFilter<"Client"> | string | null
    token_expires_at?: DateTimeNullableFilter<"Client"> | Date | string | null
    created_at?: DateTimeFilter<"Client"> | Date | string
    updated_at?: DateTimeFilter<"Client"> | Date | string
    agreements?: AgreementListRelationFilter
    audit_events?: AuditEventListRelationFilter
  }, "id" | "email">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    company_name?: SortOrder
    contact_name?: SortOrder
    email?: SortOrder
    role_title?: SortOrder
    notes?: SortOrderInput | SortOrder
    logo_url?: SortOrderInput | SortOrder
    status?: SortOrder
    created_by?: SortOrder
    activation_token?: SortOrderInput | SortOrder
    token_expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    company_name?: StringWithAggregatesFilter<"Client"> | string
    contact_name?: StringWithAggregatesFilter<"Client"> | string
    email?: StringWithAggregatesFilter<"Client"> | string
    role_title?: StringWithAggregatesFilter<"Client"> | string
    notes?: StringNullableWithAggregatesFilter<"Client"> | string | null
    logo_url?: StringNullableWithAggregatesFilter<"Client"> | string | null
    status?: StringWithAggregatesFilter<"Client"> | string
    created_by?: StringWithAggregatesFilter<"Client"> | string
    activation_token?: StringNullableWithAggregatesFilter<"Client"> | string | null
    token_expires_at?: DateTimeNullableWithAggregatesFilter<"Client"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Client"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type AgreementWhereInput = {
    AND?: AgreementWhereInput | AgreementWhereInput[]
    OR?: AgreementWhereInput[]
    NOT?: AgreementWhereInput | AgreementWhereInput[]
    id?: StringFilter<"Agreement"> | string
    client_id?: StringFilter<"Agreement"> | string
    terms_version?: StringFilter<"Agreement"> | string
    pdf_url?: StringNullableFilter<"Agreement"> | string | null
    signed_at?: DateTimeFilter<"Agreement"> | Date | string
    signer_name?: StringFilter<"Agreement"> | string
    signer_ip?: StringFilter<"Agreement"> | string
    signature_hash?: StringFilter<"Agreement"> | string
    created_at?: DateTimeFilter<"Agreement"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type AgreementOrderByWithRelationInput = {
    id?: SortOrder
    client_id?: SortOrder
    terms_version?: SortOrder
    pdf_url?: SortOrderInput | SortOrder
    signed_at?: SortOrder
    signer_name?: SortOrder
    signer_ip?: SortOrder
    signature_hash?: SortOrder
    created_at?: SortOrder
    client?: ClientOrderByWithRelationInput
  }

  export type AgreementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgreementWhereInput | AgreementWhereInput[]
    OR?: AgreementWhereInput[]
    NOT?: AgreementWhereInput | AgreementWhereInput[]
    client_id?: StringFilter<"Agreement"> | string
    terms_version?: StringFilter<"Agreement"> | string
    pdf_url?: StringNullableFilter<"Agreement"> | string | null
    signed_at?: DateTimeFilter<"Agreement"> | Date | string
    signer_name?: StringFilter<"Agreement"> | string
    signer_ip?: StringFilter<"Agreement"> | string
    signature_hash?: StringFilter<"Agreement"> | string
    created_at?: DateTimeFilter<"Agreement"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id">

  export type AgreementOrderByWithAggregationInput = {
    id?: SortOrder
    client_id?: SortOrder
    terms_version?: SortOrder
    pdf_url?: SortOrderInput | SortOrder
    signed_at?: SortOrder
    signer_name?: SortOrder
    signer_ip?: SortOrder
    signature_hash?: SortOrder
    created_at?: SortOrder
    _count?: AgreementCountOrderByAggregateInput
    _max?: AgreementMaxOrderByAggregateInput
    _min?: AgreementMinOrderByAggregateInput
  }

  export type AgreementScalarWhereWithAggregatesInput = {
    AND?: AgreementScalarWhereWithAggregatesInput | AgreementScalarWhereWithAggregatesInput[]
    OR?: AgreementScalarWhereWithAggregatesInput[]
    NOT?: AgreementScalarWhereWithAggregatesInput | AgreementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agreement"> | string
    client_id?: StringWithAggregatesFilter<"Agreement"> | string
    terms_version?: StringWithAggregatesFilter<"Agreement"> | string
    pdf_url?: StringNullableWithAggregatesFilter<"Agreement"> | string | null
    signed_at?: DateTimeWithAggregatesFilter<"Agreement"> | Date | string
    signer_name?: StringWithAggregatesFilter<"Agreement"> | string
    signer_ip?: StringWithAggregatesFilter<"Agreement"> | string
    signature_hash?: StringWithAggregatesFilter<"Agreement"> | string
    created_at?: DateTimeWithAggregatesFilter<"Agreement"> | Date | string
  }

  export type AuditEventWhereInput = {
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    id?: StringFilter<"AuditEvent"> | string
    client_id?: StringFilter<"AuditEvent"> | string
    actor?: StringFilter<"AuditEvent"> | string
    action?: StringFilter<"AuditEvent"> | string
    payload?: JsonFilter<"AuditEvent">
    created_at?: DateTimeFilter<"AuditEvent"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }

  export type AuditEventOrderByWithRelationInput = {
    id?: SortOrder
    client_id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    client?: ClientOrderByWithRelationInput
  }

  export type AuditEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditEventWhereInput | AuditEventWhereInput[]
    OR?: AuditEventWhereInput[]
    NOT?: AuditEventWhereInput | AuditEventWhereInput[]
    client_id?: StringFilter<"AuditEvent"> | string
    actor?: StringFilter<"AuditEvent"> | string
    action?: StringFilter<"AuditEvent"> | string
    payload?: JsonFilter<"AuditEvent">
    created_at?: DateTimeFilter<"AuditEvent"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
  }, "id">

  export type AuditEventOrderByWithAggregationInput = {
    id?: SortOrder
    client_id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
    _count?: AuditEventCountOrderByAggregateInput
    _max?: AuditEventMaxOrderByAggregateInput
    _min?: AuditEventMinOrderByAggregateInput
  }

  export type AuditEventScalarWhereWithAggregatesInput = {
    AND?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    OR?: AuditEventScalarWhereWithAggregatesInput[]
    NOT?: AuditEventScalarWhereWithAggregatesInput | AuditEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditEvent"> | string
    client_id?: StringWithAggregatesFilter<"AuditEvent"> | string
    actor?: StringWithAggregatesFilter<"AuditEvent"> | string
    action?: StringWithAggregatesFilter<"AuditEvent"> | string
    payload?: JsonWithAggregatesFilter<"AuditEvent">
    created_at?: DateTimeWithAggregatesFilter<"AuditEvent"> | Date | string
  }

  export type WebhookEndpointWhereInput = {
    AND?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    OR?: WebhookEndpointWhereInput[]
    NOT?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    id?: StringFilter<"WebhookEndpoint"> | string
    url?: StringFilter<"WebhookEndpoint"> | string
    secret?: StringFilter<"WebhookEndpoint"> | string
    enabled?: BoolFilter<"WebhookEndpoint"> | boolean
    created_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updated_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
  }

  export type WebhookEndpointOrderByWithRelationInput = {
    id?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WebhookEndpointWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    OR?: WebhookEndpointWhereInput[]
    NOT?: WebhookEndpointWhereInput | WebhookEndpointWhereInput[]
    url?: StringFilter<"WebhookEndpoint"> | string
    secret?: StringFilter<"WebhookEndpoint"> | string
    enabled?: BoolFilter<"WebhookEndpoint"> | boolean
    created_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
    updated_at?: DateTimeFilter<"WebhookEndpoint"> | Date | string
  }, "id">

  export type WebhookEndpointOrderByWithAggregationInput = {
    id?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: WebhookEndpointCountOrderByAggregateInput
    _max?: WebhookEndpointMaxOrderByAggregateInput
    _min?: WebhookEndpointMinOrderByAggregateInput
  }

  export type WebhookEndpointScalarWhereWithAggregatesInput = {
    AND?: WebhookEndpointScalarWhereWithAggregatesInput | WebhookEndpointScalarWhereWithAggregatesInput[]
    OR?: WebhookEndpointScalarWhereWithAggregatesInput[]
    NOT?: WebhookEndpointScalarWhereWithAggregatesInput | WebhookEndpointScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    url?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    secret?: StringWithAggregatesFilter<"WebhookEndpoint"> | string
    enabled?: BoolWithAggregatesFilter<"WebhookEndpoint"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"WebhookEndpoint"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"WebhookEndpoint"> | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes?: string | null
    logo_url?: string | null
    status?: string
    created_by: string
    activation_token?: string | null
    token_expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    agreements?: AgreementCreateNestedManyWithoutClientInput
    audit_events?: AuditEventCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes?: string | null
    logo_url?: string | null
    status?: string
    created_by: string
    activation_token?: string | null
    token_expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    agreements?: AgreementUncheckedCreateNestedManyWithoutClientInput
    audit_events?: AuditEventUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    agreements?: AgreementUpdateManyWithoutClientNestedInput
    audit_events?: AuditEventUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    agreements?: AgreementUncheckedUpdateManyWithoutClientNestedInput
    audit_events?: AuditEventUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes?: string | null
    logo_url?: string | null
    status?: string
    created_by: string
    activation_token?: string | null
    token_expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgreementCreateInput = {
    id?: string
    terms_version: string
    pdf_url?: string | null
    signed_at: Date | string
    signer_name: string
    signer_ip: string
    signature_hash: string
    created_at?: Date | string
    client: ClientCreateNestedOneWithoutAgreementsInput
  }

  export type AgreementUncheckedCreateInput = {
    id?: string
    client_id: string
    terms_version: string
    pdf_url?: string | null
    signed_at: Date | string
    signer_name: string
    signer_ip: string
    signature_hash: string
    created_at?: Date | string
  }

  export type AgreementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    terms_version?: StringFieldUpdateOperationsInput | string
    pdf_url?: NullableStringFieldUpdateOperationsInput | string | null
    signed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    signer_name?: StringFieldUpdateOperationsInput | string
    signer_ip?: StringFieldUpdateOperationsInput | string
    signature_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutAgreementsNestedInput
  }

  export type AgreementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    terms_version?: StringFieldUpdateOperationsInput | string
    pdf_url?: NullableStringFieldUpdateOperationsInput | string | null
    signed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    signer_name?: StringFieldUpdateOperationsInput | string
    signer_ip?: StringFieldUpdateOperationsInput | string
    signature_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgreementCreateManyInput = {
    id?: string
    client_id: string
    terms_version: string
    pdf_url?: string | null
    signed_at: Date | string
    signer_name: string
    signer_ip: string
    signature_hash: string
    created_at?: Date | string
  }

  export type AgreementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    terms_version?: StringFieldUpdateOperationsInput | string
    pdf_url?: NullableStringFieldUpdateOperationsInput | string | null
    signed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    signer_name?: StringFieldUpdateOperationsInput | string
    signer_ip?: StringFieldUpdateOperationsInput | string
    signature_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgreementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    terms_version?: StringFieldUpdateOperationsInput | string
    pdf_url?: NullableStringFieldUpdateOperationsInput | string | null
    signed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    signer_name?: StringFieldUpdateOperationsInput | string
    signer_ip?: StringFieldUpdateOperationsInput | string
    signature_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateInput = {
    id?: string
    actor: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
    client: ClientCreateNestedOneWithoutAudit_eventsInput
  }

  export type AuditEventUncheckedCreateInput = {
    id?: string
    client_id: string
    actor: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutAudit_eventsNestedInput
  }

  export type AuditEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventCreateManyInput = {
    id?: string
    client_id: string
    actor: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointCreateInput = {
    id?: string
    url: string
    secret: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointUncheckedCreateInput = {
    id?: string
    url: string
    secret: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointCreateManyInput = {
    id?: string
    url: string
    secret: string
    enabled?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type WebhookEndpointUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookEndpointUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    secret?: StringFieldUpdateOperationsInput | string
    enabled?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AgreementListRelationFilter = {
    every?: AgreementWhereInput
    some?: AgreementWhereInput
    none?: AgreementWhereInput
  }

  export type AuditEventListRelationFilter = {
    every?: AuditEventWhereInput
    some?: AuditEventWhereInput
    none?: AuditEventWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgreementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    company_name?: SortOrder
    contact_name?: SortOrder
    email?: SortOrder
    role_title?: SortOrder
    notes?: SortOrder
    logo_url?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    activation_token?: SortOrder
    token_expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    company_name?: SortOrder
    contact_name?: SortOrder
    email?: SortOrder
    role_title?: SortOrder
    notes?: SortOrder
    logo_url?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    activation_token?: SortOrder
    token_expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    company_name?: SortOrder
    contact_name?: SortOrder
    email?: SortOrder
    role_title?: SortOrder
    notes?: SortOrder
    logo_url?: SortOrder
    status?: SortOrder
    created_by?: SortOrder
    activation_token?: SortOrder
    token_expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type AgreementCountOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    terms_version?: SortOrder
    pdf_url?: SortOrder
    signed_at?: SortOrder
    signer_name?: SortOrder
    signer_ip?: SortOrder
    signature_hash?: SortOrder
    created_at?: SortOrder
  }

  export type AgreementMaxOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    terms_version?: SortOrder
    pdf_url?: SortOrder
    signed_at?: SortOrder
    signer_name?: SortOrder
    signer_ip?: SortOrder
    signature_hash?: SortOrder
    created_at?: SortOrder
  }

  export type AgreementMinOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    terms_version?: SortOrder
    pdf_url?: SortOrder
    signed_at?: SortOrder
    signer_name?: SortOrder
    signer_ip?: SortOrder
    signature_hash?: SortOrder
    created_at?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditEventCountOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    payload?: SortOrder
    created_at?: SortOrder
  }

  export type AuditEventMaxOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    created_at?: SortOrder
  }

  export type AuditEventMinOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    actor?: SortOrder
    action?: SortOrder
    created_at?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type WebhookEndpointCountOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WebhookEndpointMaxOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type WebhookEndpointMinOrderByAggregateInput = {
    id?: SortOrder
    url?: SortOrder
    secret?: SortOrder
    enabled?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AgreementCreateNestedManyWithoutClientInput = {
    create?: XOR<AgreementCreateWithoutClientInput, AgreementUncheckedCreateWithoutClientInput> | AgreementCreateWithoutClientInput[] | AgreementUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AgreementCreateOrConnectWithoutClientInput | AgreementCreateOrConnectWithoutClientInput[]
    createMany?: AgreementCreateManyClientInputEnvelope
    connect?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
  }

  export type AuditEventCreateNestedManyWithoutClientInput = {
    create?: XOR<AuditEventCreateWithoutClientInput, AuditEventUncheckedCreateWithoutClientInput> | AuditEventCreateWithoutClientInput[] | AuditEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutClientInput | AuditEventCreateOrConnectWithoutClientInput[]
    createMany?: AuditEventCreateManyClientInputEnvelope
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
  }

  export type AgreementUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AgreementCreateWithoutClientInput, AgreementUncheckedCreateWithoutClientInput> | AgreementCreateWithoutClientInput[] | AgreementUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AgreementCreateOrConnectWithoutClientInput | AgreementCreateOrConnectWithoutClientInput[]
    createMany?: AgreementCreateManyClientInputEnvelope
    connect?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
  }

  export type AuditEventUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<AuditEventCreateWithoutClientInput, AuditEventUncheckedCreateWithoutClientInput> | AuditEventCreateWithoutClientInput[] | AuditEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutClientInput | AuditEventCreateOrConnectWithoutClientInput[]
    createMany?: AuditEventCreateManyClientInputEnvelope
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AgreementUpdateManyWithoutClientNestedInput = {
    create?: XOR<AgreementCreateWithoutClientInput, AgreementUncheckedCreateWithoutClientInput> | AgreementCreateWithoutClientInput[] | AgreementUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AgreementCreateOrConnectWithoutClientInput | AgreementCreateOrConnectWithoutClientInput[]
    upsert?: AgreementUpsertWithWhereUniqueWithoutClientInput | AgreementUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AgreementCreateManyClientInputEnvelope
    set?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    disconnect?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    delete?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    connect?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    update?: AgreementUpdateWithWhereUniqueWithoutClientInput | AgreementUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AgreementUpdateManyWithWhereWithoutClientInput | AgreementUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AgreementScalarWhereInput | AgreementScalarWhereInput[]
  }

  export type AuditEventUpdateManyWithoutClientNestedInput = {
    create?: XOR<AuditEventCreateWithoutClientInput, AuditEventUncheckedCreateWithoutClientInput> | AuditEventCreateWithoutClientInput[] | AuditEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutClientInput | AuditEventCreateOrConnectWithoutClientInput[]
    upsert?: AuditEventUpsertWithWhereUniqueWithoutClientInput | AuditEventUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AuditEventCreateManyClientInputEnvelope
    set?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    disconnect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    delete?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    update?: AuditEventUpdateWithWhereUniqueWithoutClientInput | AuditEventUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AuditEventUpdateManyWithWhereWithoutClientInput | AuditEventUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
  }

  export type AgreementUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AgreementCreateWithoutClientInput, AgreementUncheckedCreateWithoutClientInput> | AgreementCreateWithoutClientInput[] | AgreementUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AgreementCreateOrConnectWithoutClientInput | AgreementCreateOrConnectWithoutClientInput[]
    upsert?: AgreementUpsertWithWhereUniqueWithoutClientInput | AgreementUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AgreementCreateManyClientInputEnvelope
    set?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    disconnect?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    delete?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    connect?: AgreementWhereUniqueInput | AgreementWhereUniqueInput[]
    update?: AgreementUpdateWithWhereUniqueWithoutClientInput | AgreementUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AgreementUpdateManyWithWhereWithoutClientInput | AgreementUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AgreementScalarWhereInput | AgreementScalarWhereInput[]
  }

  export type AuditEventUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<AuditEventCreateWithoutClientInput, AuditEventUncheckedCreateWithoutClientInput> | AuditEventCreateWithoutClientInput[] | AuditEventUncheckedCreateWithoutClientInput[]
    connectOrCreate?: AuditEventCreateOrConnectWithoutClientInput | AuditEventCreateOrConnectWithoutClientInput[]
    upsert?: AuditEventUpsertWithWhereUniqueWithoutClientInput | AuditEventUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: AuditEventCreateManyClientInputEnvelope
    set?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    disconnect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    delete?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    connect?: AuditEventWhereUniqueInput | AuditEventWhereUniqueInput[]
    update?: AuditEventUpdateWithWhereUniqueWithoutClientInput | AuditEventUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: AuditEventUpdateManyWithWhereWithoutClientInput | AuditEventUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutAgreementsInput = {
    create?: XOR<ClientCreateWithoutAgreementsInput, ClientUncheckedCreateWithoutAgreementsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAgreementsInput
    connect?: ClientWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutAgreementsNestedInput = {
    create?: XOR<ClientCreateWithoutAgreementsInput, ClientUncheckedCreateWithoutAgreementsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAgreementsInput
    upsert?: ClientUpsertWithoutAgreementsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutAgreementsInput, ClientUpdateWithoutAgreementsInput>, ClientUncheckedUpdateWithoutAgreementsInput>
  }

  export type ClientCreateNestedOneWithoutAudit_eventsInput = {
    create?: XOR<ClientCreateWithoutAudit_eventsInput, ClientUncheckedCreateWithoutAudit_eventsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAudit_eventsInput
    connect?: ClientWhereUniqueInput
  }

  export type ClientUpdateOneRequiredWithoutAudit_eventsNestedInput = {
    create?: XOR<ClientCreateWithoutAudit_eventsInput, ClientUncheckedCreateWithoutAudit_eventsInput>
    connectOrCreate?: ClientCreateOrConnectWithoutAudit_eventsInput
    upsert?: ClientUpsertWithoutAudit_eventsInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutAudit_eventsInput, ClientUpdateWithoutAudit_eventsInput>, ClientUncheckedUpdateWithoutAudit_eventsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AgreementCreateWithoutClientInput = {
    id?: string
    terms_version: string
    pdf_url?: string | null
    signed_at: Date | string
    signer_name: string
    signer_ip: string
    signature_hash: string
    created_at?: Date | string
  }

  export type AgreementUncheckedCreateWithoutClientInput = {
    id?: string
    terms_version: string
    pdf_url?: string | null
    signed_at: Date | string
    signer_name: string
    signer_ip: string
    signature_hash: string
    created_at?: Date | string
  }

  export type AgreementCreateOrConnectWithoutClientInput = {
    where: AgreementWhereUniqueInput
    create: XOR<AgreementCreateWithoutClientInput, AgreementUncheckedCreateWithoutClientInput>
  }

  export type AgreementCreateManyClientInputEnvelope = {
    data: AgreementCreateManyClientInput | AgreementCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type AuditEventCreateWithoutClientInput = {
    id?: string
    actor: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditEventUncheckedCreateWithoutClientInput = {
    id?: string
    actor: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditEventCreateOrConnectWithoutClientInput = {
    where: AuditEventWhereUniqueInput
    create: XOR<AuditEventCreateWithoutClientInput, AuditEventUncheckedCreateWithoutClientInput>
  }

  export type AuditEventCreateManyClientInputEnvelope = {
    data: AuditEventCreateManyClientInput | AuditEventCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type AgreementUpsertWithWhereUniqueWithoutClientInput = {
    where: AgreementWhereUniqueInput
    update: XOR<AgreementUpdateWithoutClientInput, AgreementUncheckedUpdateWithoutClientInput>
    create: XOR<AgreementCreateWithoutClientInput, AgreementUncheckedCreateWithoutClientInput>
  }

  export type AgreementUpdateWithWhereUniqueWithoutClientInput = {
    where: AgreementWhereUniqueInput
    data: XOR<AgreementUpdateWithoutClientInput, AgreementUncheckedUpdateWithoutClientInput>
  }

  export type AgreementUpdateManyWithWhereWithoutClientInput = {
    where: AgreementScalarWhereInput
    data: XOR<AgreementUpdateManyMutationInput, AgreementUncheckedUpdateManyWithoutClientInput>
  }

  export type AgreementScalarWhereInput = {
    AND?: AgreementScalarWhereInput | AgreementScalarWhereInput[]
    OR?: AgreementScalarWhereInput[]
    NOT?: AgreementScalarWhereInput | AgreementScalarWhereInput[]
    id?: StringFilter<"Agreement"> | string
    client_id?: StringFilter<"Agreement"> | string
    terms_version?: StringFilter<"Agreement"> | string
    pdf_url?: StringNullableFilter<"Agreement"> | string | null
    signed_at?: DateTimeFilter<"Agreement"> | Date | string
    signer_name?: StringFilter<"Agreement"> | string
    signer_ip?: StringFilter<"Agreement"> | string
    signature_hash?: StringFilter<"Agreement"> | string
    created_at?: DateTimeFilter<"Agreement"> | Date | string
  }

  export type AuditEventUpsertWithWhereUniqueWithoutClientInput = {
    where: AuditEventWhereUniqueInput
    update: XOR<AuditEventUpdateWithoutClientInput, AuditEventUncheckedUpdateWithoutClientInput>
    create: XOR<AuditEventCreateWithoutClientInput, AuditEventUncheckedCreateWithoutClientInput>
  }

  export type AuditEventUpdateWithWhereUniqueWithoutClientInput = {
    where: AuditEventWhereUniqueInput
    data: XOR<AuditEventUpdateWithoutClientInput, AuditEventUncheckedUpdateWithoutClientInput>
  }

  export type AuditEventUpdateManyWithWhereWithoutClientInput = {
    where: AuditEventScalarWhereInput
    data: XOR<AuditEventUpdateManyMutationInput, AuditEventUncheckedUpdateManyWithoutClientInput>
  }

  export type AuditEventScalarWhereInput = {
    AND?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
    OR?: AuditEventScalarWhereInput[]
    NOT?: AuditEventScalarWhereInput | AuditEventScalarWhereInput[]
    id?: StringFilter<"AuditEvent"> | string
    client_id?: StringFilter<"AuditEvent"> | string
    actor?: StringFilter<"AuditEvent"> | string
    action?: StringFilter<"AuditEvent"> | string
    payload?: JsonFilter<"AuditEvent">
    created_at?: DateTimeFilter<"AuditEvent"> | Date | string
  }

  export type ClientCreateWithoutAgreementsInput = {
    id?: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes?: string | null
    logo_url?: string | null
    status?: string
    created_by: string
    activation_token?: string | null
    token_expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    audit_events?: AuditEventCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutAgreementsInput = {
    id?: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes?: string | null
    logo_url?: string | null
    status?: string
    created_by: string
    activation_token?: string | null
    token_expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    audit_events?: AuditEventUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutAgreementsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutAgreementsInput, ClientUncheckedCreateWithoutAgreementsInput>
  }

  export type ClientUpsertWithoutAgreementsInput = {
    update: XOR<ClientUpdateWithoutAgreementsInput, ClientUncheckedUpdateWithoutAgreementsInput>
    create: XOR<ClientCreateWithoutAgreementsInput, ClientUncheckedCreateWithoutAgreementsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutAgreementsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutAgreementsInput, ClientUncheckedUpdateWithoutAgreementsInput>
  }

  export type ClientUpdateWithoutAgreementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    audit_events?: AuditEventUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutAgreementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    audit_events?: AuditEventUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateWithoutAudit_eventsInput = {
    id?: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes?: string | null
    logo_url?: string | null
    status?: string
    created_by: string
    activation_token?: string | null
    token_expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    agreements?: AgreementCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutAudit_eventsInput = {
    id?: string
    company_name: string
    contact_name: string
    email: string
    role_title: string
    notes?: string | null
    logo_url?: string | null
    status?: string
    created_by: string
    activation_token?: string | null
    token_expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    agreements?: AgreementUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutAudit_eventsInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutAudit_eventsInput, ClientUncheckedCreateWithoutAudit_eventsInput>
  }

  export type ClientUpsertWithoutAudit_eventsInput = {
    update: XOR<ClientUpdateWithoutAudit_eventsInput, ClientUncheckedUpdateWithoutAudit_eventsInput>
    create: XOR<ClientCreateWithoutAudit_eventsInput, ClientUncheckedCreateWithoutAudit_eventsInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutAudit_eventsInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutAudit_eventsInput, ClientUncheckedUpdateWithoutAudit_eventsInput>
  }

  export type ClientUpdateWithoutAudit_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    agreements?: AgreementUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutAudit_eventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    contact_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role_title?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    logo_url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    created_by?: StringFieldUpdateOperationsInput | string
    activation_token?: NullableStringFieldUpdateOperationsInput | string | null
    token_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    agreements?: AgreementUncheckedUpdateManyWithoutClientNestedInput
  }

  export type AgreementCreateManyClientInput = {
    id?: string
    terms_version: string
    pdf_url?: string | null
    signed_at: Date | string
    signer_name: string
    signer_ip: string
    signature_hash: string
    created_at?: Date | string
  }

  export type AuditEventCreateManyClientInput = {
    id?: string
    actor: string
    action: string
    payload: JsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AgreementUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    terms_version?: StringFieldUpdateOperationsInput | string
    pdf_url?: NullableStringFieldUpdateOperationsInput | string | null
    signed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    signer_name?: StringFieldUpdateOperationsInput | string
    signer_ip?: StringFieldUpdateOperationsInput | string
    signature_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgreementUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    terms_version?: StringFieldUpdateOperationsInput | string
    pdf_url?: NullableStringFieldUpdateOperationsInput | string | null
    signed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    signer_name?: StringFieldUpdateOperationsInput | string
    signer_ip?: StringFieldUpdateOperationsInput | string
    signature_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgreementUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    terms_version?: StringFieldUpdateOperationsInput | string
    pdf_url?: NullableStringFieldUpdateOperationsInput | string | null
    signed_at?: DateTimeFieldUpdateOperationsInput | Date | string
    signer_name?: StringFieldUpdateOperationsInput | string
    signer_ip?: StringFieldUpdateOperationsInput | string
    signature_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditEventUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    actor?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}