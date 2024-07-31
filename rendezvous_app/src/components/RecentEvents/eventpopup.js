import React, { useState, useEffect } from 'react';
import BackendApi from '../../Pages/fastapi';
import './eventpopup.css'

const EventPopup = ({ isOpen, onClose, accountId }) => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 6;

  // useEffect to retrieve every event a user has hosted, using pagination in the API endpoint
  useEffect(() => {
    if (isOpen && accountId) {
      BackendApi.get(`/accounts/${accountId}/all-hosted-events`, {
        params: {
          page: currentPage,
          limit: eventsPerPage
        }
      })
      .then(response => {
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error('Error fetching events:', error));
    }
  }, [isOpen, accountId, currentPage]);

  if (!isOpen) return null;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //the displayed component's code is here
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>All Hosted Events</h2>
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="all-event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <span>{event.date}</span>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
