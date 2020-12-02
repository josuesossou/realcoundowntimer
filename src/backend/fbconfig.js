import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

 
const config = {
	// apiKey: "AIzaSyBroYRGrpaDwv40F6VDcbO6Qny_r5B-SH4",
	// authDomain: "cdtimer-ed6ac.firebaseapp.com",
	// databaseURL: "https://cdtimer-ed6ac.firebaseio.com",
	// projectId: "cdtimer-ed6ac",
	// storageBucket: "cdtimer-ed6ac.appspot.com",
	// messagingSenderId: "833370404085",
	// appId: "1:833370404085:web:560b171419e1c623e5c1bc",
	// measurementId: "G-E4PMGKNQPP"
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APPID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
 
class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.db = app.firestore();
	}

	// *** Auth API ***
	doCreateUserWithEmailAndPassword = (email, password) =>
	this.auth.createUserWithEmailAndPassword(email, password);
	
	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);
	
	doSignOut = () => this.auth.signOut();
	
	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
	
	doPasswordUpdate = password =>
		this.auth.currentUser.updatePassword(password);

	// **** Firestore API ***
	getCountdownPageData = async (uuid) => {
		try {
			const doc = await this.db.collection("countdownpagedata").doc(uuid).get()
			return doc.data()
		} catch (err) {
			console.log(err)
			return null
		}
	}

	getCountdownPagesData = async () => {
		try {
			const data = await this.db.collection("countdownpagedata").get()
			return data.docs
		} catch (err) {
			console.log(err)
			return null
		}
	}
	
	setCountdownPageData = async (uuid, data) => {
		try {
			await this.db.collection("countdownpagedata").doc(uuid).set(data)
			return  true
		} catch (error) {
			console.log(error)
			return false
		}
		
	}
}
 
export default Firebase;