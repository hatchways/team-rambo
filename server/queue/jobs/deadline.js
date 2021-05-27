/*
  Deadline reminder job handler.
*/
module.exports = (job) => {
  console.log(job.data);

  /*
    1. Fetch the card.
    2. Check if it's due.
    3. Send email if it's due otherwise, resove false.
  */
  
  return Promise.resolve(true);
}