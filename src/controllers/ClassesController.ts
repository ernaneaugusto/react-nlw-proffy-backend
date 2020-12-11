import { Request, Response, response } from "express";
import db from './../database/connection';
import convertHourToMinutes from './../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassController {
    async index(req: Request, res: Response) {
        const filters = req.query;
        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;
        console.log("### filters", filters);

        const timeToMinutes = convertHourToMinutes(filters.time as string);

        if (!week_day || !subject || !time) {
            return res.status(400).json({
                error: '\n\n\n\nNão há filtros para realizar a listagem.'
            });
        }

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule`.`from` <= ??', [timeToMinutes])
                .whereRaw('`class_schedule`.`to` > ??', [timeToMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);
        

        console.log("\n\n\n## OS FILTROS", classes);
        

        return res.json(classes);
    }

    async create(req: Request, res: Response) {
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
    }
}