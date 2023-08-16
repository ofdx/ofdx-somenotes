// External dependencies
import React from 'react';
import { nanoid } from 'nanoid';

// Local imports
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Todo from './components/Todo';


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function getHeadingText(tasks){
  var remaining = 0;

  tasks.forEach(t => {
    if(!t.completed)
      ++ remaining;
  });

  return ('' + remaining + ' task' + (remaining === 1 ? '' : 's') + ' remaining');
}

function usePrevious(value){
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function App(props){
  const [tasks, setTasks] = React.useState(props.tasks);

  const [filter, setFilter] = React.useState('All');
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilterFn={setFilter}
    />
  ));

  function addTask(name){
    // Love that this has disgusting bash syntax lmao come on guys.
    const t = { id: `todo-${nanoid()}`, name, completed: false };
    const l = [...tasks, t];

    setHeadingText(getHeadingText(l));
    setTasks(l);
  }

  function editTask(id, name){
    const l = tasks.map((task) => {
      if(id === task.id)
        return {...task, name: name};

      return task;
    });

    setTasks(l);
  }

  function toggleTaskCompleted(id){
    const updatedTasks = tasks.map((task) => {
      if(id === task.id)
        return { ...task, completed: !task.completed };

      return task;
    });

    setHeadingText(getHeadingText(updatedTasks));
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const l = tasks.filter((t) => id !== t.id);

    setHeadingText(getHeadingText(l));
    setTasks(l);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        key={task.id}
        name={task.name}
        completed={task.completed}
        toggleTaskCompletedFn={toggleTaskCompleted}
        deleteTaskFn={deleteTask}
        editTaskFn={editTask}
      />
    )
  );
  const [headingText, setHeadingText] = React.useState(getHeadingText(tasks));

  const listHeadingRef = React.useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  React.useEffect(() => {
    if(tasks.length === (prevTaskLength - 1))
      listHeadingRef.current.focus();
  }, [ tasks.length, prevTaskLength ]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTaskFn={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;