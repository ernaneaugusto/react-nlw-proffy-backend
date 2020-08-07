import express, { response } from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

// configura as rotas do express
const routes = express.Router();

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

routes.post('/classes', async (req, res) => {
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule,
    } = req.body;

    console.log("## req.body", req.body);

    // cria uma transaction para garantir que todos os dados foram inseridos em todas as tabelas
    const transaction = await db.transaction();

    try {
        const insertedUsersIds = await transaction('users').insert({
            name,
            avatar,
            whatsapp,
            bio
        });

        const user_id = insertedUsersIds[0];

        const insertedClassesIds = await transaction('classes').insert({
            subject,
            cost,
            user_id
        });

        const class_id = insertedClassesIds[0];

        const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
            return {
                class_id,
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to)
            };
        });

        await transaction('class_schedule').insert(classSchedule);

        await transaction.commit(); // realiza de fato as insercoes no BD

        return res.status(201).send();
    } catch (error) {
        await transaction.rollback();

        return response
            .status(400)
            .json({
                error: 'Erro inesperado ao criar uma nova aula!'
            });
    }
});

export default routes;