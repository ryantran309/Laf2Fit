import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import {
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  ModalContent,
  Select,
} from "@chakra-ui/react";
import BaseLayout from "../layouts";
import {
  deleteSchedule,
  listSchedules,
  saveSchedule,
  updateSchedule,
} from "../controllers/schedule";

const FixedTd = styled(Td)`
  max-width: 50px;
  white-space: wrap;
`;

export default function ExcerciseSchedulePage() {
  const plan = useSelector((state) => state.user.plan);
  const { isLoading, data } = useSelector((state) => state.schedule);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { schedules, maxEntriesCount } = data;
  const [schedule, setSchedule] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    listSchedules();
  }, []);

  const getSchedule = (day, arrayIdx) => {
    const array = schedules[day];
    if (!Array.isArray(array)) return {};

    if (arrayIdx >= array.length) return {};

    return array[arrayIdx];
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditSchedule = (day, arrayIdx) => {
    const schedule = getSchedule(day, arrayIdx);
    console.log("schedule: ", schedule);
    setSchedule(schedule);
    setIsEditMode(true);
  };

  const handleCloseEditSchedule = () => {
    setIsEditMode(false);
    setSchedule(undefined);
  };

  const renderThItem = (day, arrayIdx) => {
    const schedule = getSchedule(day, arrayIdx);
    if (!schedule || !schedule.name) return "";

    if (schedule.repCount) {
      return `${schedule.name} (${schedule.repCount ?? ""})`;
    }
    return schedule.name;
  };

  const getScheduleLabel = () => {
    if (!plan) return "Schedule";
    else if (plan === "Weight Gain") return "Weight Gain Schedule";
    else if (plan === "Weight Loss") return "Weight Loss Schedule";
    else if (plan === "Self Change") return "Self Change Schedule";
    return "Schedule";
  };

  return (
    <BaseLayout>
      <Heading textAlign="center" marginTop={5}>
        {getScheduleLabel()}
      </Heading>

      <AddItemModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <EditItemModal
        schedule={schedule ?? {}}
        isOpen={isEditMode && schedule}
        onClose={handleCloseEditSchedule}
      />

      {isLoading ? (
        <Text>Please wait ...</Text>
      ) : (
        <Table marginTop={10} variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Monday</Th>
              <Th>Tuesday</Th>
              <Th>Wednesday</Th>
              <Th>Thursday</Th>
              <Th>Friday</Th>
              <Th>Saturday</Th>
              <Th>Sunday</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: maxEntriesCount }, (_, index) => index + 1).map((item, idx) => (
              <Tr key={item}>
                <FixedTd cursor="pointer" onClick={() => handleEditSchedule("Monday", idx)}>
                  {renderThItem("Monday", idx)}
                </FixedTd>
                <FixedTd cursor="pointer" onClick={() => handleEditSchedule("Tuesday", idx)}>
                  {renderThItem("Tuesday", idx)}
                </FixedTd>
                <FixedTd cursor="pointer" onClick={() => handleEditSchedule("Wednesday", idx)}>
                  {renderThItem("Wednesday", idx)}
                </FixedTd>
                <FixedTd cursor="pointer" onClick={() => handleEditSchedule("Thursday", idx)}>
                  {renderThItem("Thursday", idx)}
                </FixedTd>
                <FixedTd cursor="pointer" onClick={() => handleEditSchedule("Friday", idx)}>
                  {renderThItem("Friday", idx)}
                </FixedTd>
                <FixedTd cursor="pointer" onClick={() => handleEditSchedule("Saturday", idx)}>
                  {renderThItem("Saturday", idx)}
                </FixedTd>
                <FixedTd cursor="pointer" onClick={() => handleEditSchedule("Sunday", idx)}>
                  {renderThItem("Sunday", idx)}
                </FixedTd>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Button
        marginTop={5}
        size="md"
        leftIcon={<FiPlusCircle />}
        onClick={() => setIsModalOpen(true)}
      >
        Add
      </Button>
    </BaseLayout>
  );
}

function AddItemModal({ isOpen, onClose }) {
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [repCount, setRepCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name || !day || !repCount) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);

      await saveSchedule({ name, day, repCount });
      setIsLoading(false);
      setName("");
      setDay("");
      setRepCount("");

      onClose();
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Exercise</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Day</FormLabel>
            <Select placeholder="----" value={day} onChange={(e) => setDay(e.target.value)}>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
              <option>Sunday</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Exercise</FormLabel>
            <Input placeholder="Exercise" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Rep Count</FormLabel>
            <Input
              placeholder="Rep Count"
              value={repCount}
              onChange={(e) => setRepCount(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            {isLoading ? "Please wait ..." : "Save"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function EditItemModal({ isOpen, onClose, schedule }) {
  const [name, setName] = useState("");
  const [repCount, setRepCount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log("schedule: ", schedule);

    if (schedule.name) {
      setName(schedule.name);
    }

    setRepCount(schedule.repCount ?? "");
  }, [schedule]);

  const handleSave = async () => {
    if (!name || !repCount) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);

      await updateSchedule({ ...schedule, name, repCount });
      setIsLoading(false);
      setName("");
      setRepCount("");

      onClose();
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteSchedule({ ...schedule, name });
      setIsDeleting(true);

      setName("");

      onClose();
    } catch (err) {
      setIsDeleting(true);
    }
  };

  if (!schedule || Object.keys(schedule).length === 0) return <></>;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Exercise</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Selected Day</FormLabel>
            <Input readOnly value={schedule.day} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Exercise</FormLabel>
            <Input placeholder="Exercise" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Rep Count</FormLabel>
            <Input
              placeholder="Rep Count"
              value={repCount}
              onChange={(e) => setRepCount(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            {isLoading ? "Please wait ..." : "Update"}
          </Button>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="pink" onClick={handleDelete}>
            {isDeleting ? "Please wait ..." : "Delete"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
