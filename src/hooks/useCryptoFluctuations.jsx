import { useEffect, useState } from 'react'
import axios from "axios";

const useCryptoFluctuations = (crypto) => {
  const [infos, setInfos] = useState(null)
  const getInfos = () => {
    axios
      .get(`https://api.nomics.com/v1/currencies/ticker?key=${process.env.REACT_APP_CURRENCY_RATE_KEY}&ids=${crypto}&interval=1d&convert=EUR`)
      .then((res) => {
        setInfos(res[0].data)
      })
  }

  useEffect(() => {
    getInfos()
  }, [infos, getInfos])

  return infos
}
export default useCryptoFluctuations