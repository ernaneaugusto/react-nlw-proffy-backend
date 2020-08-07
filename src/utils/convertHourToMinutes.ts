export default function convertHourToMinutes(time: string) {
    // faz um split em HH:MM tranformando HH e MM em valores inteiros
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;
    return timeInMinutes;
}