import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "synergyflow-digital-p7c0g",
  "appId": "1:867205490601:web:a4b9a8f0cd5c93f79346b8",
  "storageBucket": "synergyflow-digital-p7c0g.firebasestorage.app",
  "apiKey": "AIzaSyAO1xYAhh9ONCZjZI2zliUn_dEPdfaZr2Y",
  "authDomain": "synergyflow-digital-p7c0g.firebaseapp.com",
  "messagingSenderId": "867205490601"
};

const app = initializeApp(firebaseConfig);
const realAuth = getAuth(app);

const proxyAuth = new Proxy({}, {
  get(_, prop) {
    const value = realAuth[prop];
    return typeof value === 'function' ? value.bind(realAuth) : value;
  }
});

async function test() {
  try {
    await signInWithEmailAndPassword(proxyAuth, 'test@adsverse.in', 'password123');
    console.log("Success with proxy!");
  } catch (e) {
    console.error("Error with proxy:", e.message);
  }
}

test();
