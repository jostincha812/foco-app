# Change Log
## v0.1
* Skeleton using new RN Navigation

## v0.2
* Root container with navigator options:
  * **RootDrawerNavigator**, **RootStackNavigator**, **RootTabNavigator**
* __Icons__ set, __Theme__ and __Style__ skeleton

## v0.3
* **FlashcardViewer** with _Yes/No_ and _Bookmark_ actions
* **Flashcard** component using **Flipcard**, **Markdown** and **TagsList**

## v0.4
* **FlashcardViewer** progressing through cards and shows progress indicator
* **Flashcard** component using **Starred** action

## v0.5
* **Home** shows _Featured_ and _My Cards_ card sets

## v0.6
* **Home** shows _Starred_ cards set that automatically refreshes from FB

## v0.7
* upgraded to react-navigation 1.0.0.beta11

## v0.8
* **FlashcardsSetConfigurator** creates set from Tags

### v0.8.1
* **FlashcardsSetConfigurator** edits and deletes sets
### v0.8.2
* **FlashcardsSetConfigurator** and **FlashcardsViewer** clean-up and refactoring

## v0.9
* Authenticating users through Facebook login

## v0.9.1
* Upgraded to react-native 0.49.3
* Upgraded Android configs
* Linked react-native-firebase to Android and iOS
* Cards component family

## v0.9.2
* Using Cards components
* Bookmarkable collections
* Starred cards screen
* Redux using screen namespaces

## v0.9.3
* Simplified user profile view
* Premium content locking views
* Starred cards filtering
* User feedback submission
* Collections and Cards lists has BackToTop

## 0.9.4
* Responsive font sizing
* Consistent styling and font styles
* Sticky nav headers

## 1.0.0-alpha.1
* _This_ changelog
* Updated with production firebase settings
* Updated with production Splash and Tab Navigation styles

## 1.0.0-alpha.2
* _Coming soon_ collection cards

## 1.0.0-alpha.3
* Hide navigation title in screens with sticky headers
* Automatically assign card color based on Collection.category

## 1.0.0-alpha.4
* TextShadows on Hero Cards
* Tightened Markdown Styles
* Fixed crash when FlashcardTags and FlashcardPrefs not present in firebase

## 1.0.0-alpha.5
* ADMIN-ONLY lightweight data seeder

## 1.0.0-alpha.6
* Limited number of tags shown in Flashcard

## 1.0.0-beta.1
* Hide varietals filters
* Added version in profile UI
* Changed Sign Out to button

## 1.0.0-beta.2
* Upgraded to react 16.2.0, react-native 0.53.3, react-navigation 1.5.11, react-native-facebook-login 1.6.1, react-native-firebase 4.0.0
* Updated to react-native-firebase 4.0.0 API
* Minor bug fixes

## 1.0.1 === 1.0.0-beta.3
* Authentication bug fixes for react-native-firebase 4.0.0

## 1.0.2
* "New" collections badge
* Removed "flagging" action for non-admins

## 1.0.3 - 1.0.4
* Maintenance build

## 1.0.5
* Reverse sorting Collections lists
* Collection.minVersion checking

## 1.0.6
* Updated "Pull to Refresh" message

## 1.0.7 - 1.0.9
* Maintenance build

## 1.1.0
* iOS IAP Dialogs

## 1.1.1
* Fixed missing translation for Full Access purchases
* Added productId to IAP event tracking

## 1.2
* IAP price testing
* Unlock from User Profile
* (1.2.41) Refactored component responsibilities in IAP flow
* (1.2.43) Logging flashcard flips
* (1.2.43) Showing IAP cancel and error messages separately

## 1.3
* Using redux store for CurrentUser
* Added _reviewers only_ GoPremiumScreen
* (1.3.47) Improved readability on iPhoneSE devices
