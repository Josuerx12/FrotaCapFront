function useTimeCalc() {
  function milissegundosParaHorasMinutos(milissegundos: number) {
    // Calcula o total de segundos
    const segundosTotal = Math.floor(milissegundos / 1000);

    // Calcula o total de minutos
    const minutos = Math.floor(segundosTotal / 60);

    // Calcula o total de horas
    const horas = Math.floor(minutos / 60);

    // Calcula os minutos restantes após a conversão em horas
    const minutosRestantes = minutos % 60;

    return `${horas} horas e ${minutosRestantes} minutos`;
  }

  return { milissegundosParaHorasMinutos };
}

export { useTimeCalc };
