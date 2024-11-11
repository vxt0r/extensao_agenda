import { useSQLiteContext } from "expo-sqlite"

export class ReservaDatabase {
  id: number
  cliente: string
  data_servico: string 
  tipo_servico: string | null
  duracao_min: number  | null

  constructor(id: number, cliente: string, dataServico: string, tipoServico: string | null, duracaoMin: number | null) {
    this.id = id
    this.cliente = cliente
    this.data_servico= dataServico
    this.tipo_servico = tipoServico
    this.duracao_min = duracaoMin
  }
}

type DatetimeReserve = {
  data_servico: string,
  duracao_min: number 
}

export function useReservaDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<ReservaDatabase, "id">) {
    const query = await database.prepareAsync(`
      INSERT INTO reservas (cliente,data_servico,tipo_servico,duracao_min) 
      VALUES ($cliente, $dataServico, $tipoServico,$duracaoMin)`
    )

    try {
      const result = await query.executeAsync({
        $cliente: data.cliente,
        $dataServico: data.data_servico,
        $tipoServico: data.tipo_servico,
        $duracaoMin: data.duracao_min
      })
      const insertedRowId = result.lastInsertRowId.toLocaleString()
      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await query.finalizeAsync()
    }
  };

  async function listAll() {
    const query = ` SELECT id,cliente,data_servico,tipo_servico,duracao_min 
                    FROM reservas ORDER BY data_servico ASC`
    try {
      const result = await database.getAllAsync(query)
      if (!Array.isArray(result)) {
        throw new Error("Os dados retornados não são um array")
      }
      const reservas: ReservaDatabase[] = result.filter(isReserva).
      map((r) => new ReservaDatabase(
        r.id, r.cliente, 
        r.data_servico,r.tipo_servico,
        r.duracao_min
      ))
      return reservas
      
    } catch (error) {
      throw error
    }
  }

  async function getById(id: number) {
    try {
      const reservaDB = await database.execAsync("SELECT id,cliente,data_servico,tipo_servico,duracao_min FROM reservas WHERE id = " + id)
      if(isReserva(reservaDB)){
        return new ReservaDatabase(
          reservaDB.id, reservaDB.cliente, reservaDB.data_servico, reservaDB.tipo_servico,reservaDB.duracao_min
        )
      }
      return undefined
    } catch (error) {
      throw error
    }
  }


  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM reservas WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function getByDay(datetime: string) {
    const [date,time] = datetime.split(' ')
    const query = ` SELECT data_servico,duracao_min FROM reservas 
                    WHERE data_servico LIKE '`+ date + `%'`
    try {
      const result = await database.getAllAsync(query)
      const data = result.filter(isDatetimeReserve).map((r)=>{
        let d : DatetimeReserve = {
          data_servico : r.data_servico,
          duracao_min : r.duracao_min ? r.duracao_min : 30
        } 
        return d
      })
      return data
      
    } catch (error) {
      throw error
    }
  }

  function isReserva(data: any): data is ReservaDatabase {
    return (
      typeof data.id === 'number' &&
      typeof data.cliente === 'string' &&
      typeof data.data_servico === 'string' &&
      (typeof data.tipo_servico === 'string' || typeof data.data_servico === null) &&
      (typeof data.duracao_min === 'number' || typeof data.duracao_min === null)  
      )
  }

  function isDatetimeReserve (data: any): data is DatetimeReserve {
    return (
      typeof data.data_servico === 'string' &&
      (typeof data.duracao_min === 'number' || typeof data.duracao_min === null)  
      )
  }

  return { create, listAll, remove, getById, getByDay }
}
