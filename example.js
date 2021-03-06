var { match, lt } = require("egna")

/* Try changing the year to something earlier than 1950 */

let car = async () => ({ make: 'Toyota', year: 1968 });

car()
  .match(
    { make: 'Subaru'}, 'Subaru',
  
    { year: lt(1950) }, car => `Super old ${car.make}`,

    { make: 'Toyota' }, ({ year }) => `Toyota from ${year}`,

    _ => {throw 'I dont recognize this car'}
  )
  .then(console.log)
  .catch( (e) => console.log("error: " + e) );