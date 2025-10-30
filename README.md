# Shared Todo & Agenda App

A minimalistic shared todo list app for iOS built with React Native/Expo and Firebase. Perfect for couples to manage tasks and keep track of shared responsibilities.

## Features

- **Two-Column Layout**: Separate lists for you and your wife
- **Real-time Sync**: Changes appear instantly on both devices via Firebase
- **Due Dates**: Set optional due dates for todos
- **Drag & Drop**: Long press any item to move it between lists
- **Simple & Clean**: Minimalistic design focused on functionality
- **No Authentication Required**: Just configure Firebase and start using

## Tech Stack

- React Native with Expo
- TypeScript
- Firebase Realtime Database
- React Native DateTimePicker

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable **Realtime Database**:
   - In the Firebase Console, go to "Build" > "Realtime Database"
   - Click "Create Database"
   - Start in **test mode** for now (you can add security rules later)
4. Get your Firebase configuration:
   - Go to Project Settings (gear icon) > General
   - Scroll to "Your apps" section
   - Click the web icon (</>)
   - Copy the `firebaseConfig` object

### 2. Configure the App

1. Open `firebaseConfig.ts` in the project root
2. Replace the placeholder values with your Firebase configuration:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the App

For iOS:
```bash
npm run ios
```

Or use the Expo Go app:
```bash
npm start
```
Then scan the QR code with your iPhone camera.

## Usage

### Adding Todos
- Tap the "+ Add Todo" button in either column
- Enter the task text
- Optionally set a due date
- Tap "Add"

### Completing Todos
- Tap on any todo to mark it as complete/incomplete

### Moving Todos Between Lists
- **Long press** on any todo item
- Confirm to move it to the other person's list

### Deleting Todos
- Tap the "×" button on any todo item

## Customization

### Change Column Names
Edit `App.tsx` lines 42 and 51 to customize the column titles:
```typescript
<TodoColumn
  title="Your Custom Name"  // Change this
  owner="person1"
  // ...
/>
```

### Firebase Security Rules

Once you're ready to secure your database, update your Firebase Realtime Database rules:

```json
{
  "rules": {
    "todos": {
      ".read": true,
      ".write": true
    }
  }
}
```

For more advanced security, you can add user-specific rules later.

## Project Structure

```
.
├── App.tsx                      # Main app component
├── firebaseConfig.ts            # Firebase configuration
├── firebaseService.ts           # Firebase CRUD operations
├── types.ts                     # TypeScript type definitions
├── components/
│   ├── TodoColumn.tsx           # Individual column component
│   ├── TodoItem.tsx             # Todo item component
│   └── AddTodoModal.tsx         # Modal for adding new todos
└── package.json
```

## Future Enhancements

Some ideas for future features:
- Calendar view for agenda items
- Push notifications for due dates
- Categories/tags for todos
- Recurring tasks
- Notes/attachments
- Dark mode
- Custom themes

## Troubleshooting

### Firebase Connection Issues
- Verify your `firebaseConfig.ts` has the correct credentials
- Check that Realtime Database is enabled in Firebase Console
- Ensure database rules allow read/write access

### App Won't Start
- Run `npm install` again
- Clear Expo cache: `npx expo start --clear`
- Make sure you have Expo CLI installed: `npm install -g expo-cli`

## License

MIT - Feel free to use and modify for your personal needs!
