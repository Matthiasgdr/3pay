import { useEffect, useState } from 'react'
import axios from "axios";

const useCryptoFluctuations = (crypto) => {
  const [infos, setInfos] = useState(null)
  const getInfos = () => {
    axios
      .get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_CURRENCY_RATE_KEY}&ids=${crypto}&interval=1d&convert=EUR`)
      .catch(() => {
        return null
      })
      .then((res) => {
        setInfos(res.data)
        //["1d"]?.volume_change_pct
      })
  }

  useEffect(() => {
    getInfos()
  }, [infos])

  return infos
}
export default useCryptoFluctuations