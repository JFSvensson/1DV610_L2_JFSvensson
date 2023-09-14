import whereIsTheSun from './whereIsTheSun.js'

const sun20230913 = new whereIsTheSun('2023-09-13', 15)
const sun20000913 = new whereIsTheSun('2000-09-13', 15)

sun20230913.whereIsTheSun()
sun20000913.whereIsTheSun()

export default whereIsTheSun
