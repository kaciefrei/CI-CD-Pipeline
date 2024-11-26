const taskController = require('../../controllers/taskController');
const Task = require('../../models/Task');
const httpMocks = require('node-mocks-http');

jest.mock('../../models/Task');

describe('Task Controller - createTask', () => {
    it('should create a new task', async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            body: { description: 'Test Task' },
        });
        const res = httpMocks.createResponse();

        // Mock de la méthode save pour simuler l'enregistrement de la tâche
        Task.prototype.save = jest.fn().mockResolvedValue({
            _id: '1',
            description: 'Test Task',
        });

        // Appel du contrôleur
        await taskController.createTask(req, res);

        // Vérification du code de statut
        expect(res.statusCode).toBe(201);

        // Vérification de la réponse JSON.
        const responseBody = res._getJSONData();
        expect(responseBody.description).toBe('Test Task');
        expect(responseBody._id).toBeDefined(); // Vérifiez que l'ID a été généré
    });
});
