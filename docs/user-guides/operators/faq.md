# Operator FAQ - Frequently Asked Questions

## Getting Started

### How do I access the operator dashboard?
1. Navigate to the login page (bookmark this URL)
2. Click "Sign in with Google" 
3. Use your work Google account (not personal account)
4. You'll be redirected to the dashboard after successful authentication

### What Google account should I use?
Always use your organization's Google Workspace account. Personal Gmail accounts will not have the necessary permissions to access the operator dashboard.

### Can I bookmark the dashboard?
Yes, definitely bookmark the dashboard URL for quick access. You can skip the login page and go directly to the dashboard - you'll be redirected to authenticate if needed.

### How do I know if my account has proper access?
If you can see the dashboard with client creation options and existing client lists, your access is properly configured. If you see "Access Denied" messages, contact your IT administrator.

## Client Management

### How many clients can I create?
There's no hard limit on the number of clients you can create. The system is designed to handle high volumes of client activations efficiently.

### Can I edit client information after creation?
Client information editing capabilities depend on your system configuration. Check the client details view for edit options. If editing isn't available, contact support for data corrections.

### What happens to old client records?
Client records remain in the system for audit and compliance purposes. You can use filters to focus on active clients, but historical records are maintained.

### Can I delete a client by mistake?
Most systems have safeguards against accidental deletion. If deletion is available, there are usually confirmation prompts. Deleted data may be recoverable through support.

## Activation Links

### How long are activation links valid?
Activation links expire after exactly 24 hours from generation for security reasons. This gives clients a reasonable window while maintaining security.

### Can I extend the 24-hour expiration?
No, expiration times are fixed for security. If a client needs more time, generate a new activation link, which provides a fresh 24-hour window.

### What if I need to send a new link?
Simply generate a new activation link from the dashboard. The old link will be invalidated for security when a new one is created.

### Can clients use the same link multiple times?
No, each activation link can only be used once. After successful activation, the link becomes invalid. This is a security measure to prevent unauthorized access.

### Is it safe to send links via email?
Yes, activation links are designed to be safely shared via business email. They expire quickly and can only be used once. Always use secure business email accounts.

## Real-Time Monitoring

### How quickly do status updates appear?
Status changes typically appear within 2-3 seconds of occurring. No page refresh is needed - updates happen automatically.

### What if real-time updates stop working?
Try refreshing the dashboard page. If updates consistently don't appear, check your internet connection and browser settings. JavaScript must be enabled for real-time functionality.

### Can I see when a client starts the activation process?
Yes, the dashboard will show when clients access their activation links and begin the process. Status changes from "Pending" to "In Progress" when they start.

### How do I know when PDF generation is complete?
The client status will change to "Completed" when the entire process, including PDF generation, is finished. This typically takes 1-2 minutes after signature.

## Technical Questions

### What browsers work with the dashboard?
The dashboard works with all modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox  
- Safari (Mac/iOS)
- Microsoft Edge
- Mobile browsers on tablets and smartphones

### Do I need special software installed?
No additional software is needed. The dashboard runs entirely in your web browser and requires only an internet connection.

### Can I use the dashboard on my mobile device?
Yes, the dashboard is responsive and works on mobile devices. However, desktop/laptop computers provide the best experience for managing multiple clients.

### What internet connection do I need?
Any standard broadband connection is sufficient. Real-time updates require a stable connection, so wired connections are preferred over WiFi when possible.

## Client Support

### What should I do if a client reports problems?
1. Check their client status in the dashboard for any error indicators
2. Verify they're using the correct, unexpired activation link
3. Guide them through basic troubleshooting (different browser, clear cache)
4. Generate a new activation link if technical issues persist
5. Escalate to support if problems continue across multiple attempts

### How can I help clients with technical difficulties?
- Provide our [Client Troubleshooting Guide](../clients/troubleshooting.md)
- Offer to test their activation link yourself
- Suggest they try a different browser or device
- Walk them through the process over the phone if needed

### What if a client's PDF download fails?
PDF download issues are usually browser-related:
- Have them try a different browser
- Check if pop-up blockers are enabled (they should disable for your site)
- Verify they have adequate storage space
- Generate a new activation if the download window has expired

### Can I download a copy of the client's agreement?
Yes, after successful activation, you can download the same PDF the client receives. Look for download options in the client details view.

## Error Resolution

### What does "Error" status mean on a client record?
Error status indicates something went wrong during the activation process. Click on the client record to see specific error details, then take appropriate action based on the error type.

### How do I fix PDF generation errors?
PDF generation errors usually resolve by generating a new activation link for the client. If errors persist across multiple clients, contact support immediately.

### What if the dashboard shows "Server Error"?
Server errors are typically temporary. Wait 5 minutes and try again. If errors persist, contact support. Don't repeatedly retry as this can worsen server issues.

### Why might an activation fail?
Common causes of activation failures:
- Client connectivity issues during the process
- Browser compatibility problems
- Expired activation links
- System maintenance or temporary outages
- Client accidentally closing browser during processing

## Business Process Questions

### How do I integrate this with our CRM?
Integration capabilities vary by system. Check with your IT team about available CRM integrations or data export options for client records.

### Can I set up automated emails to clients?
Email automation features depend on your system configuration. Check dashboard settings or contact your administrator about available automation options.

### How do I generate reports on activation activity?
Look for export or reporting features in the dashboard. Many systems provide CSV exports of client data and activation metrics.

### What's the best way to track client progress?
Use the dashboard's filtering and sorting options to focus on clients in different stages. The real-time updates help you monitor progress without constant checking.

## Security and Compliance

### Is client data secure?
Yes, the system uses enterprise-grade security including encrypted data transmission, secure storage, and strict access controls. All data handling complies with relevant privacy regulations.

### Who can access client information?
Only authorized operators in your organization can access client data through the dashboard. Access is controlled through your Google Workspace permissions.

### How long is client data retained?
Data retention policies vary by organization and compliance requirements. Contact your administrator for specific retention information for your deployment.

### Are electronic signatures legally valid?
Yes, electronic signatures created through this system are legally binding in most jurisdictions under laws like E-SIGN Act and similar international regulations.

## Advanced Features

### Can I customize activation pages?
Customization options depend on your system configuration. Company logos are automatically displayed, and some systems allow custom terms or branding elements.

### Is there an API for integration?
API availability depends on your system setup. Contact your IT team or support for information about API access and integration capabilities.

### Can I set up webhook notifications?
Webhook capabilities vary by system. Check with your administrator about available webhook endpoints for integration with your business systems.

### How do I add other operators to the system?
User management is typically handled by your IT administrator through your Google Workspace settings. Contact them to add new operators or modify permissions.

## Performance and Optimization

### How can I make the dashboard load faster?
- Use a wired internet connection when possible
- Keep your browser updated to the latest version
- Close unnecessary browser tabs
- Clear browser cache regularly
- Use Chrome or Firefox for best performance

### What's the best way to manage many clients?
- Use dashboard filters to focus on specific client groups
- Sort clients by status or activity to prioritize attention
- Consider assigning different operators to different client segments
- Use search functionality to quickly find specific clients

### How do I handle peak usage times?
During busy periods:
- Monitor the dashboard more frequently
- Prepare additional support resources
- Stagger client communications to spread load
- Have backup communication methods ready

## Training and Support

### How can I learn to use advanced features?
- Review all available documentation guides
- Ask for additional training from your administrator
- Practice with test clients if available
- Contact support for feature-specific guidance

### What if I need help during off-hours?
Support availability varies by organization. Check your support contact information for after-hours availability. For critical issues, emergency contact procedures may be available.

### Can I get training for my team?
Many systems offer group training sessions. Contact your administrator or support team about training options for multiple operators.

### How do I stay updated on new features?
- Check for dashboard announcements or notifications
- Review updated documentation periodically  
- Subscribe to system updates if available
- Attend training sessions when offered

## Troubleshooting Quick Reference

### Dashboard won't load
1. Check internet connection
2. Clear browser cache and cookies
3. Try different browser or incognito mode
4. Verify correct dashboard URL

### Client creation fails
1. Verify all required fields completed
2. Check logo file size (under 2MB) and format (JPG/PNG/GIF)
3. Try different browser
4. Check internet connection stability

### Real-time updates stopped
1. Refresh the dashboard page
2. Check JavaScript is enabled
3. Test internet connection
4. Try different browser

### Activation link doesn't work
1. Verify complete URL was shared
2. Check if link has expired (24 hours)
3. Generate new activation link
4. Test link in different browser

## Still Need Help?

If your question isn't answered here:
- Check our detailed [Troubleshooting Guide](./troubleshooting.md) for step-by-step solutions
- Review our [Dashboard Guide](./dashboard-guide.md) for comprehensive feature explanations
- See our [Link Sharing Best Practices](./link-sharing.md) for client communication guidance
- [Contact Support](../common/contact-support.md) for personalized assistance

Remember to include specific details about your issue when contacting support, including error messages, browser information, and steps you've already tried.