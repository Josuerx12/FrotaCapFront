/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";

export interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro: boolean;
}

export function useFindByCep() {
  async function findByCep(cep: number): Promise<IAddress> {
    try {
      const res = (await axios.get(`https://viacep.com.br/ws/${cep}/json/`))
        .data;
      if (res.erro) {
        throw new Error(`CEP: ${cep}, não encontrado! Cadastre manualmente`);
      }

      toast.success("Pesquisa realizada com sucesso!");
      return res;
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  }

  return { findByCep };
}
