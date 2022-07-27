import React from 'react';

import TaskList from './TaskList';
import * as TaskStories from './Task.stories'

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [story => <div style={{padding : '3rem'}}>{story()}</div>]  // 스토리 래핑, {story()}는 <Outlet /> 같은것이다.
}

const Template = args => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task4' },
    { ...TaskStories.Pinned.args.task, id: '5', title: 'Task5' },
    { ...TaskStories.Pinned.args.task, id: '7', title: 'Task7' },
    { ...TaskStories.Archived.args.task, id: '8', title: 'Task8' },
  ]
}

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true
}

export const Empty = Template.bind({});
Empty.args = {
  tasks: [],
  loading: false
}