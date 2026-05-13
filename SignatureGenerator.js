/**
 * Google Workspace Directory Signature Generator
 * Designed to be embedded in a Google Site (Intranet).
 * * Instructions:
 * 1. Enable 'Admin SDK API' in Services.
 * 2. Update the 'ORG_CONFIG' variables below.
 * 3. Deploy as a Web App (Execute as: User accessing / Who has access: Anyone in Org).
 */

const ORG_CONFIG = {
  domain: "example.com",
  websiteUrl: "https://www.example.com",
  logoUrl: "https://www.example.com/logo.png",
  mainPhone: "555-555-5555",
  address: "123 Business Rd, Suite 100, City, ST 12345",
  mapsUrl: "https://maps.google.com/?q=123+Business+Rd+City+ST+12345"
};

function doGet() {
  var userEmail = Session.getActiveUser().getEmail();
  
  try {
    var user = AdminDirectory.Users.get(userEmail);
    
    // 1. Get Name Details
    var firstName = user.name.givenName || "First";
    var lastName = user.name.familyName || "Last";
    
    // 2. Get Job Title
    var title = (user.organizations && user.organizations[0].title) ? user.organizations[0].title : "Team Member";
    
    // 3. Extract Extension from Work Phone field (format: +15555555555 x123)
    var extPart = "";
    if (user.phones) {
      user.phones.forEach(function(phone) {
        if (phone.type === "work") {
          var match = phone.value.match(/x\d+/i);
          if (match) extPart = " " + match[0].toLowerCase();
        }
      });
    }

    // 4. Generate HTML Output
    var htmlOutput = `
      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 10px; display: inline-block;">
        
        <p style="font-size: 11px; color: #888; margin-top: 0; margin-bottom: 10px;">SIGNATURE PREVIEW:</p>

        <div style="background: white; padding: 20px; border: 1px solid #ddd; display: inline-block;">
          
          <div id="signature">
            <p style="color:rgb(34,34,34); margin:0; padding:0; font-family: Arial, sans-serif;">
              <span style="color:rgb(0,0,0)"><i><span style="font-size:11pt"><b>${firstName} ${lastName}<br></b></span></i></span>
              <span style="font-size:11pt"><font color="#000000">${title}<br></font></span>
              <a href="${ORG_CONFIG.websiteUrl}" style="color:rgb(17,85,204);font-size:11pt;text-decoration:none;" target="_blank"><b>${ORG_CONFIG.domain}</b></a>
              <b style="font-size:11pt"><font color="#000000"> | ${ORG_CONFIG.mainPhone}${extPart}<br></font></b>
              <b style="color:rgb(0,0,0)"><span style="font-size:11pt"><a href="${ORG_CONFIG.mapsUrl}" style="color:rgb(17,85,204);text-decoration:none;" target="_blank">${ORG_CONFIG.address}</a></span></b>
            </p>
            <div style="margin-top: 10px;">
              <a href="${ORG_CONFIG.websiteUrl}"><img src="${ORG_CONFIG.logoUrl}" alt="Company Logo" width="160" style="display: block; border: 0; height: auto;"></a>
            </div>
          </div>

        </div>
        
        <div style="margin-top: 20px;">
          <button onclick="copySig()" style="background-color: #000; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 14px; margin-right: 10px;">
            1. Copy My Signature
          </button>
          
          <a href="https://mail.google.com/mail/u/0/#settings/general" target="_blank" style="display: inline-block; background-color: #ffffff; color: #444; border: 1px solid #ccc; padding: 11px 24px; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 14px; text-decoration: none;">
            2. Open Gmail Settings
          </a>
        </div>
      </div>

      <script>
        function copySig() {
          const range = document.createRange();
          const signature = document.getElementById('signature');
          range.selectNode(signature);
          window.getSelection().removeAllRanges();
          window.getSelection().addRange(range);
          try {
            document.execCommand('copy');
            alert('Signature copied to clipboard!');
          } catch (err) {
            alert('Selection failed. Please highlight and copy manually.');
          }
          window.getSelection().removeAllRanges();
        }
      </script>
    `;
    
    return HtmlService.createHtmlOutput(htmlOutput)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setTitle("Workspace Signature Generator");
    
  } catch (e) {
    return HtmlService.createHtmlOutput("Error: Ensure Admin SDK is enabled and user has a Directory profile.");
  }
}
