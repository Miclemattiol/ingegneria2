import * as express from 'express';
import * as mongoose from 'mongoose';
import { credentials, employee, user } from './assets/types';
import * as cors from 'cors';

export default class Server {
    private app: express.Application;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.app = express();
        this.app.use(cors());
        this.app.use(express.json());

        this.initMongoose();

        this.app.post('/api/employeeLogin', async (req, res) => {
            console.log(req.body);
            let { email, password } = req.body as credentials;

            let employee: any = await mongoose.model('Employee').findOne({ 'email': email, 'password': password });
            console.log(employee);
            if (employee) {
                const emp = {
                    id: employee._id,
                    email: employee.email,
                    name: employee.name,
                    surname: employee.surname,
                    level: employee.level,
                };
                return res.status(200).send(employee);
            } else {
                return res.status(404).send();
            }


        });

        this.app.get('/api/books', async (req, res) => {
            let { titolo, genere, autore, casaEditrice } = req.query;
            console.log(`Titolo: ${titolo}, Genere: ${genere}, Autore: ${autore}, Casa Editrice: ${casaEditrice}`);

            let book: any = await mongoose.model('Book').find({
                $or: [ 
                    {'title': { '$regex': titolo, '$options': 'i' } }, 
                    {'isbn': { '$regex': titolo, '$options': 'i' }  }
                ],
                'genre': { '$regex': genere, '$options': 'i' },
                'author': { '$regex': autore, '$options': 'i' },
                'publisher': { '$regex': casaEditrice, '$options': 'i' },
            });

            console.log(book);

            if (book) {
                return res.status(200).send(book);
            } else {
                return res.status(404).send();
            }
        })

        this.app.listen(3000, () => console.log('Server listening on port 3000'));
    }

    start(callback: () => void) {
        this.app.listen(this.port, callback);
    }

    async initMongoose() {
        await mongoose.connect("mongodb+srv://ingegneriaDelSoftware:Ingegneria2022@ingegneriasoftware.f15a54l.mongodb.net/?retryWrites=true&w=majority");

        let employeeSchema = new mongoose.Schema({
            email: String,
            password: String,
            name: String,
            surname: String,
            level: Number,
        });

        const Employee = mongoose.model('Employee', employeeSchema);

        let bookSchema = new mongoose.Schema({
            title: String,
            author: String,
            publisher: String,
            genre: String,
            isbn: String,
        });

        const Book = mongoose.model('Book', bookSchema);
    }
}


new Server(3000);