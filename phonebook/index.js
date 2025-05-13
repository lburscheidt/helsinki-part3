const express = require("express");
const app = express();
app.use(express.json());
let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];
/*3-1*/
app.get("/", (request, response) => {
	response.send(
		`<h1>Phonebook</h1><br><a href="http://localhost:3001/api/persons">Persons</a><br><a href="http://localhost:3001/info">Info</a>`,
	);
});
/*3-1*/
app.get("/api/persons", (request, response) => {
	response.json(persons);
});

/*3-2*/
app.get("/info", (request, response) => {
	response.send(
		`Phonebook has info for ${persons.length} people<br>${new Date()}`,
	);
});

/*3-3 */
app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((person) => person.id === id);
	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

/*3-4 */

app.delete("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	persons = persons.filter((person) => person.id !== id);

	response.status(204).end();
});

/*3-5*/

const generateId = () => {
	const maxId =
		persons.length > 0 ? Math.max(...persons.map((p) => Number(p.id))) : 0;
	return String(maxId + 1);
};
/*3-6*/

app.post("/api/persons", (request, response) => {
	const body = request.body;

	if (!body.name) {
		return response.status(400).json({
			error: "name missing",
		});
	}

	if (!body.number) {
		return response.status(400).json({
			error: "number missing",
		});
	}

	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	if (persons.filter((p) => p.name === person.name)) {
		return response.status(400).json({
			error: "already in phonebook",
		});
	}

	persons = persons.concat(person);

	response.json(person);
});

/*3-1*/
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
