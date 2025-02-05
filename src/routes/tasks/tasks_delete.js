import { Task } from "../../models";

const response_message_builder = (result, task_id) => {
  console.log(result);
  if (result.length == undefined || result.length == 0) {
    return {
      status: "400",
      data: "No data to delete"
    };
  }
  return {
    status: "200",
    data: {
      oid: result[0].oid,
      title: result[0].title,
      description: result[0].description
    },
    links: [
      {
        rel: `/linkrels/tasks/${task_id}/undelete`,
        uri: `/tasks/${task_id}/undelete`
      }
    ]
  };
};

const delete_response_code = result => (result == 1 ? 200 : 400);

export default {
  method: "DELETE",
  path: "/tasks/{task_id}",
  handler: (request, reply) =>
    Task.delete(request.params.task_id).then(tasks =>
      reply
        .response(response_message_builder(tasks, request.params.task_id))
        .code(delete_response_code(tasks))
    )
};