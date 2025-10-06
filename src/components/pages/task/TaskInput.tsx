import InputWithLabel from "@/components/inputs/InputWithLabel";
import Selection from "@/components/selection/Selection";
import { useEffect, useState } from "react";

interface Option {
  id: string;
  name: string;
}

interface TaskInputProps {
  onDataChange: (taskName: string, taskType: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onDataChange }) => {
    const [newTask, setNewTask] = useState('');
    const [selectedOption, setSelectedOption] = useState<string>('');

    const options: Option[] = [
        { id: '0', name: 'Common Task' },
        { id: '1', name: 'Other Task' },
    ];

    const handleSelection = (id: string) => {
        setSelectedOption(id);
    };

    useEffect(() => {
        if (newTask && selectedOption) {
        onDataChange(newTask, selectedOption);
        }
    }, [newTask, selectedOption, onDataChange]);

    return (
        <div>
            <InputWithLabel 
                labelText="Name"
                inputType="text"
                inputId="new-task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <Selection options={options} onSelect={handleSelection} />
        </div>
    );
};

export default TaskInput;