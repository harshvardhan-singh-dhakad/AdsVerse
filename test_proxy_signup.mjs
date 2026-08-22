import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "synergyflow-digital-p7c0g",
  "appId": "1:867205490601:web:a4b9a8f0cd5c93f79346b8",
  "storageBucket": "synergyflow-digital-p7c0g.firebasestorage.app",
  "apiKey": "AIzaSyAO1xYAhh9ONCZjZI2zliUn_dEPdfaZr2Y",
  "authDomain": "synergyflow-digital-p7c0g.firebaseapp.com",
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
    const email = 'test' + Date.now() + '@adsverse.in';
    const cred = await createUserWithEmailAndPassword(proxyAuth, email, 'password123');
    console.log("Signup success with proxy:", cred.user.uid);
  } catch (e) {
    console.error("Signup error with proxy:", e.code, e.message);
  }
}

test();
