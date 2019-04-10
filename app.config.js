/**
 * Simple App configuration file
 */
export default {
  minNumber: 1, // first number to start drawing from
  gridSize: 48, // how many Numbers to draw
  stopDrawAfter: 35, // stop draw after to pick X numbers (default: 35)
  drawTimeToAppear: 300, // after how many ms will the ball with number appear when draw is in progress (default: 300)
  stayOnPageAfterDraw: 10, // number of seconds after which player will be redirected to homepage, when draw is finished (default: 10)
  amountWonMultiplier: 10, // By how much multiply won stake

  defaultStake: 50,
  minStake: 1,
  maxStake: 100,
  maxNumbers: 6, // Quantity of Numbers to choose

  maxTickets: 10, // Max allowed
  defaultBalance: 1000,
}
