Meteor.publish('questions', function () {
  return Questions.find({ course: 'css'});
});