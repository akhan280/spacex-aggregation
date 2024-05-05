
import React from 'react';

const LaunchModal = ({ launch, onClose }) => {
  if (!launch) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg max-w-3xl max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{launch.name}</h2>
        {/* Render launch media */}
        {launch.links.patch.small && (
          <img src={launch.links.patch.small} alt="Launch Patch" className="mb-4" />
        )}
        {launch.links.flickr.original.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {launch.links.flickr.original.map((image, index) => (
              <img key={index} src={image} alt={`Launch Image ${index + 1}`} />
            ))}
          </div>
        )}
        {/* Render additional launch details */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LaunchModal;