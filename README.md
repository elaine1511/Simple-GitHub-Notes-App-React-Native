# Simple-GitHub-Notes-App-React-Native
1. Start by completing the code for `App.js` to meet the navigation requirements.
  
2. Complete the code for `Search.js` screen, which has the following state: `{username, loading, error}`, Display an input with a button to search for a GitHub account, the input control should not accept capital letters and set to focus by default, your form should avoid the keyboard. Your screen will show an activity indicator from `loading` state, and show an error from the `error` state if we fail to fetch the GitHub information. Fetch the user GitHub profile details from `https://api.github.com/users/${account}` replace `account` with the GitHub account `username`. After you fetch the profile details, take the user to the Dashboard screen.
  
3. Complete the code for `Dashboard.js` screen to display the user profile picture from `avatar_url` property and show 3 buttons to display the Profile, Repositories, Notes screens. 
    * The Dashboard screen must show the user's full name on the navigation header.
  
4. Complete the code for `ProfileDetails.js` screen, where you need to display the following:
    * Display the `<Badge />` component which expects a prop called `userInfo` with the following object value: `{avatar_url, name, login}`, you don't need to modify `Badge.js`, just use it.
    * Display the following details about the user profile: `[company, location, followers, following, email, bio]`.  
  
5. Complete the code for `Repositories.js` screen, you will have to fetch the repositories details from `repos_url` property from the previous query.  
    * The component has the following state `{list, loading, error}`.
    * This screen will display the `<Badge />` component, and a `ScrollView` list of the user repos seperated by a `<Separator />` component. 
    * When the user clicks on the repository name, take the user to the `WebView` screen and pass the `html_url`. Note that `WebView` screen is expecting a parameter `url`. You don't need to modify `WebView` screen, just use it.
    * Add an activity indicator and error states to the fetch process.
  
6. Complete the code for the `Note.js` screen, 
    * This screen will display the `<Badge />` component, and a `ScrollView` list of the user notes seperated by the `<Separator />` component. At the end it will show an input to allow users adding notes. *(The notes will not be persisted, just saved in a temporary variable `notes` in the state)*. 
    * The screen has the following state `{notes, note}`.
