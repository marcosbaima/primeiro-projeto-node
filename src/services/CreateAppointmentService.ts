import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [x] Recebimento das informações
 * [/] Tratativa de erros/excessoes
 * [] Acesso ao repositorio
 */
interface RequestDTO {
  provider: string;
  date: Date;
}

/** Solid
 * Single Responsability Principle
 * Dependency Inversion
 */

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const AppointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      AppointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: AppointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
