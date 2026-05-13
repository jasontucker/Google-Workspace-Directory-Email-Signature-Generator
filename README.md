# Google Workspace Signature Generator

A lightweight, serverless web application built with **Google Apps Script** that allows staff members to generate an organization-standard Gmail signature with one click.

This tool pulls live data (Name, Job Title, and Phone Extension) directly from the **Google Workspace Directory (Admin SDK)**, ensuring signatures are always accurate and consistent across the department.

## 🚀 Features

* **Zero Input Required:** Staff don't have to type their name or title; the script identifies them via their Google Session.
* **Smart Extension Extraction:** Automatically parses the `Work Phone` field to extract and format extensions (e.g., `x123`).
* **One-Click Copy:** Uses a "Copy to Clipboard" button that preserves HTML formatting for a perfect paste into Gmail.
* **Direct Deep Link:** Includes a button that opens the specific Gmail Settings pane for the user to save them time.
* **Responsive Branding:** Built-in support for company logos and standardized brand colors.

## 🛠 Setup Instructions

### 1. Create the Script

1. Go to [script.google.com](https://script.google.com) and create a **New Project**.
2. Copy the contents of `SignatureGenerator.js` from this repository into the `Code.gs` file in your editor.

### 2. Enable the Admin SDK

This is the most important step. Without this, the script cannot "see" your staff directory.

1. In the Apps Script editor, click the **+** next to **Services** on the left sidebar.
2. Search for **Admin SDK API**.
3. Select it and click **Add**.

### 3. Configure Your Organization

Update the `ORG_CONFIG` object at the top of the script with your specific details:

```javascript
const ORG_CONFIG = {
  domain: "yourdomain.com",
  websiteUrl: "https://www.yourdomain.com",
  logoUrl: "https://www.yourdomain.com/path-to-logo.png",
  mainPhone: "555-555-5555",
  address: "123 Main St, City, ST 12345",
  mapsUrl: "https://goo.gl/maps/your-link"
};

```

### 4. Deploy as a Web App

1. Click **Deploy** > **New Deployment**.
2. Select **Web App** as the type.
3. Set **Execute as** to: `User accessing the web app` (This ensures the script sees *their* profile, not yours).
4. Set **Who has access** to: `Anyone within [Your Organization]`.
5. Click **Deploy** and copy the **Web App URL**.

### 5. Embed in Google Sites (Intranet)

1. Open your Google Site editor.
2. Select **Embed** from the Insert menu.
3. Paste the **Web App URL** you generated in the previous step.

## 📋 Requirements

* **Admin Privileges:** The user who *creates* the script must have at least read-only access to the Google Workspace Directory API.
* **User Data:** For the signature to populate correctly, users must have the **Job Title** and **Work Phone** fields filled out in the Google Admin Console.

## ⚠️ First Time Use
When a staff member accesses the tool for the first time, they will be prompted by Google to **"Review Permissions."** They must click **Allow** to grant the script permission to:
* View their basic profile (Email and Name).
* View their Directory data (Job Title and Extension).

Once authorized, the signature will generate instantly on every subsequent visit.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Created to simplify IT onboarding and brand consistency.*
