/*
 * Copyright 2019 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, {ReactElement, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {MessageFormatElement} from 'react-intl'

type DataType = Record<string, MessageFormatElement[]>

type PromiseComponentProps = {
  promiseFunction: () => Promise<DataType>
  children: (data?: DataType) => ReactElement
}

const PromiseComponent: React.FC<PromiseComponentProps> = ({promiseFunction, children}) => {
  const [data, setData] = useState<DataType>()
  const [isError, setError] = useState<boolean>()

  useEffect(() => {
    promiseFunction()
      .then(response => {
        setData(response)
      })
      .catch(() => {
        setError(true)
      })
  }, [promiseFunction])

  if (data) return children(data)
  if (isError) return <div>{'Error'}</div>
  return <div>{'Loading...'}</div>
}

PromiseComponent.propTypes = {
  children: PropTypes.func.isRequired,
  promiseFunction: PropTypes.func.isRequired
}

export default PromiseComponent
