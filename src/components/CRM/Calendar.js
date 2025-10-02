import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { motion } from 'framer-motion';
import { FaPlus, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Schůzka s Janem Novákem',
      start: new Date(2024, 11, 15, 10, 0),
      end: new Date(2024, 11, 15, 11, 0),
      resource: {
        client: 'Jan Novák',
        company: 'Novák s.r.o.',
        type: 'meeting'
      }
    },
    {
      id: 2,
      title: 'Prezentace pro Marii Svobodovou',
      start: new Date(2024, 11, 16, 14, 0),
      end: new Date(2024, 11, 16, 15, 30),
      resource: {
        client: 'Marie Svobodová',
        company: 'Svobodová a.s.',
        type: 'presentation'
      }
    },
    {
      id: 3,
      title: 'Energetická studie - Tomáš Dvořák',
      start: new Date(2024, 11, 18, 9, 0),
      end: new Date(2024, 11, 18, 12, 0),
      resource: {
        client: 'Tomáš Dvořák',
        company: 'Dvořák s.r.o.',
        type: 'study'
      }
    },
    {
      id: 4,
      title: 'Kontrola instalace',
      start: new Date(2024, 11, 20, 13, 0),
      end: new Date(2024, 11, 20, 16, 0),
      resource: {
        client: 'Jana Procházková',
        company: 'Procházková s.r.o.',
        type: 'installation'
      }
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const eventStyleGetter = (event) => {
    const colors = {
      meeting: '#3B82F6',
      presentation: '#F59E0B',
      study: '#8B5CF6',
      installation: '#10B981'
    };
    
    return {
      style: {
        backgroundColor: colors[event.resource?.type] || '#6B7280',
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      id: events.length + 1,
      title: 'Nová událost',
      start: slotInfo.start,
      end: slotInfo.end,
      resource: {
        client: 'Nový klient',
        company: 'Nová firma',
        type: 'meeting'
      }
    };
    setEvents([...events, newEvent]);
  };

  return (
    <div className="h-full p-4 lg:p-6 overflow-auto">
      <div className="max-w-7xl mx-auto h-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kalendář</h1>
          <p className="text-gray-600">Správa schůzek a událostí</p>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 h-[600px]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Plán událostí</h2>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
              <FaPlus />
              <span>Nová událost</span>
            </button>
          </div>

          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '500px' }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            views={['month', 'week', 'day']}
            defaultView="month"
            messages={{
              next: 'Další',
              previous: 'Předchozí',
              today: 'Dnes',
              month: 'Měsíc',
              week: 'Týden',
              day: 'Den',
              agenda: 'Agenda',
              date: 'Datum',
              time: 'Čas',
              event: 'Událost',
              noEventsInRange: 'Žádné události v tomto období'
            }}
          />
        </motion.div>

        {/* Event Detail Modal */}
        {showModal && selectedEvent && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Detail události</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Název</label>
                  <p className="text-gray-900 font-semibold">{selectedEvent.title}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Klient</label>
                  <p className="text-gray-900">{selectedEvent.resource?.client}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Firma</label>
                  <p className="text-gray-900">{selectedEvent.resource?.company}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Typ</label>
                  <p className="text-gray-900 capitalize">{selectedEvent.resource?.type}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Čas</label>
                  <p className="text-gray-900">
                    {moment(selectedEvent.start).format('DD.MM.YYYY HH:mm')} - 
                    {moment(selectedEvent.end).format('HH:mm')}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Zavřít
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  Upravit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
