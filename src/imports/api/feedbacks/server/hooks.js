import { Feedbacks } from '../feedbacks.js';

Feedbacks.after.insert(function(userId, doc) {
	this.unblock();
	
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
		to: 'rafael.correia.poli@gmail.com',
		from: 'feedback@envisioning.io',
		subject: 'New Feedback',
		html: html
	});
});
