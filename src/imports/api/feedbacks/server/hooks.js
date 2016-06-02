import { Feedbacks } from '../feedbacks.js';

const TO_EMAIL = 'tdb@envisioning.io';
const FROM_EMAIL = 'tdb@envisioning.io';
Feedbacks.after.insert(function(userId, doc) {
	let transformedDoc = this.transform();

	let user = transformedDoc.user();
	let userIdentification = user && user.identification() || doc.userId;
	let formattedDate = moment(doc.createdAt).format('MMMM Do YYYY, h:mm:ss a');
	let html = `
	<p><b>User</b>: ${userIdentification}<p>
	<p><b>Type</b>: ${doc.type}<p>
	<p><b>Message</b>: ${doc.message}<p>
	<p><b>Score</b>: ${doc.score}<p>
	<p><b>Date</b>: ${formattedDate}<p>
	
	`;

	Email.send({
		to: TO_EMAIL,
		from: FROM_EMAIL,
		subject: 'New Feedback',
		html: html
	});
});
