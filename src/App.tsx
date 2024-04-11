import { useState } from "react";


interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

export const App = () => {

  const state: Param[] = [
    {
      id: 1,
      name: 'Название',
      type: 'string'
    },
    {
      id: 2,
      name: 'Длина',
      type: 'string'
    }
  ]


  const modelData: ParamValue[] = state.map(el => ({
    paramId: el.id,
    value: "",
  }))

  const [model, setModel] = useState<ParamValue[]>(modelData)

  const handlerUpdateModelValueById = (value: string, paramId: number) => {
    let new_value = { paramId, value }
    let upd = model.map(el => {
      if (el.paramId == paramId) {
        return new_value
      }
      return el
    })

    setModel(upd)
  }


  const getModel = (): Model => ({
    paramValues: model
  })

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "4px",
          flexDirection: "column"
        }}
      >
        {
          state.map(el => (
            <label key={el.id} >
              {el.name}: {" "}
              <input type={el.type}
                onChange={(e) => handlerUpdateModelValueById(e.target.value, el.id)}
              />
            </label>
          ))
        }
        <br />
        <pre>
          {
            JSON.stringify(model, null, 4)

          }
        </pre>
      </div>
    </div >
  )
}