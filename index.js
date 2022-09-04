import axios from 'axios';
import chalk from 'chalk';

const URL = 'https://www.servelelecciones.cl/data/elecciones_constitucion/computo/global/19001.json';

const getData = async url => {
    const response = await axios.get(url);

    const {
        data,
        resumen,
        mesasEscrutadas,
        totalMesas,
        totalMesasPorcent
    } = response.data;

    data.forEach(stat => {
        console.log(chalk.red(`${stat.a}: ${stat.c} votos (${stat.d})`.toUpperCase()));
    });

    console.log();

    resumen.forEach(stat => {
        console.log(chalk.green(`${stat.a.toUpperCase()}: ${stat.c} votos (${stat.d})`.toUpperCase()));
    });

    console.log();

    let mesasFaltantes = Number(totalMesas.replace(/\./g, '')) - Number(mesasEscrutadas.replace(/\./g, ''));
    mesasFaltantes = mesasFaltantes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

    console.log(chalk.cyan(`Mesas escrutadas: ${mesasEscrutadas} (${totalMesasPorcent})`.toUpperCase()));
    console.log(chalk.cyan(`Mesas faltantes: ${mesasFaltantes}`.toUpperCase()));
    console.log(chalk.cyan(`Total Mesas: ${totalMesas}`.toUpperCase()));
}

getData(URL);