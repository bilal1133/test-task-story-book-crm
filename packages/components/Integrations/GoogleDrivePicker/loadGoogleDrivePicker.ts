// The Browser API key obtained from the Google API Console.
// Replace with your own Browser API key, or your own key.
const developerKey = process.env.NEXT_PUBLIC_GOOGLE_NO_FIREBASE_DEVELOPER_KEY as string;

// The Client ID obtained from the Google API Console. Replace with your own Client ID.
const clientId = process.env.NEXT_PUBLIC_GOOGLE_NO_FIREBASE_CLIENT_ID as string;

// Replace with your own project number from console.developers.google.com.
// See "Project number" under "IAM & Admin" > "Settings"
const appId = process.env.NEXT_PUBLIC_GOOGLE_NO_FIREBASE_APP_ID as string;

// Scope to use to access user's Drive items.
const scope = [
  'https://www.googleapis.com/auth/drive.file'
];

const loadGoogleDrivePicker = ({
  pickerView,
  onPicked
}: {
  pickerView: keyof typeof google.picker.ViewId;
  onPicked: (pickedUrls: Array<string>) => void;
}): void => {

  let pickerApiLoaded = false;
  let oauthToken: string | null = null;

  // Use the Google API Loader script to load the google.picker script.
  function loadPicker() {
    gapi.load('auth', { 'callback': onAuthApiLoad });
    gapi.load('picker', { 'callback': onPickerApiLoad });
  }

  const onAuthApiLoad = () => {
    window.gapi.auth.authorize(
      {
        'client_id': clientId,
        'scope': scope,
        'immediate': false
      },
      handleAuthResult
    );
  };

  const onPickerApiLoad = () => {
    pickerApiLoaded = true;
    createPicker();
  };

  const handleAuthResult = (authResult: GoogleApiOAuth2TokenObject) => {
    if (authResult && !authResult.error) {
      oauthToken = authResult.access_token;
      createPicker();
    }
  };

  // Create and render a Picker object for searching images.
  const createPicker = () => {
    if (pickerApiLoaded && oauthToken) {
      const picker = new google.picker.PickerBuilder()
        // .enableFeature(google.picker.Feature.NAV_HIDDEN)
        // .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(appId)
        .setOAuthToken(oauthToken)
        .addView(new google.picker.DocsView(google.picker.ViewId[pickerView]))
        // .addView(new google.picker.DocsView(google.picker.ViewId.FOLDERS))
        // .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .build();
      picker.setVisible(true);
    }
  };

  // A simple callback implementation.
  // interface PickerCallbackData {
  //   [action: string]: unknown;
  //   docs: Array<{
  //     name: string;
  //     type: string; // e.g. 'photo'
  //     mimeType: string; // e.g. 'image/jpeg'
  //     url: string;
  //     embedUrl: string;
  //     isShared: boolean;
  //     lastEditedUtc: number; // e.g. '1609577878826'
  //     sizeBytes: number; // e.g. '1337645'
  //   }>;
  // }
  // const pickerCallback = (data: PickerCallbackData) => {
  const pickerCallback = (data: google.picker.ResponseObject) => {
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      console.log('---- loadGoogleDrivePicker -> pickerCallback -> data', data);
      // const pickedUrls = data.docs.map(({ url }) => url);
      const pickedUrls = data.docs.map(({ embedUrl }) => embedUrl);
      onPicked(pickedUrls);
    }
  };

  loadPicker();

};

export { loadGoogleDrivePicker };

