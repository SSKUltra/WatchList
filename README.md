# Seiko JDM Tracker 2026

React-based price comparison tool for tracking Seiko JDM models during Japan travel.

## Infrastructure
- **Data Source:** Google Sheets (CSV)
- **Image Assets:** Google Drive
- **Stack:** React, Vite, Tailwind CSS, PapaParse

## Google Drive Integration

### 1. Updating the Watch List
The app is connected to a Google Sheet. To update prices or add models:
1. Open your [**Seiko Watch Trip 2026 Data**](https://drive.google.com/file/d/1nwwrnT7hkhlkP8IpXKAw34n5vbwC3XJm/view?usp=drive_link) sheet.
2. Edit rows directly. The app will fetch the updated data on the next reload.
3. Ensure the Sheet remains **"Published to Web"** as a CSV.

### 2. Adding Images
1. Upload images to your dedicated [Google Drive folder](https://drive.google.com/drive/u/0/folders/1FRXx3QVa-DuV11KUaHzPUr8V4NgliNOa).
2. Set permissions to **"Anyone with the link"**.
3. Copy the file link and paste it into the `image` column of the Google Sheet.
4. The app's `getDirectDriveUrl` utility will handle the conversion from a viewer link to a direct asset link.

## Deployment
This project uses GitHub Actions for deployment to GitHub Pages.
- **Base URL:** `/WatchList/`
- **Trigger:** Pushing to the `main` branch.