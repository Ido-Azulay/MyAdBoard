'use strict';



document.addEventListener('DOMContentLoaded', () => {

    /**
     * Function to handle the approval of an advertisement.
     * Sends a PATCH request to the server to mark the ad as approved.
     *
     * @param {string} adId - The ID of the advertisement to be approved.
     */
    const approveAd = async (adId) => {
        try {
            const response = await fetch(`/adminActions/ad/approve/${adId}`, {
                method: 'PATCH',
            });

            if (response.ok) {
                console.log('Ad approved successfully');
                location.reload();
                const adElement = document.getElementById(`nonApprovedAd-${adId}`);
                if (adElement) {
                    adElement.remove();
                }
            } else {
                console.error('Failed to approve ad');
            }
        } catch (error) {
            console.error('Error approving ad:', error);
        }
    };

    //====================================================================================================

    /**
     * Function to handle the deletion of an advertisement.
     * Sends a DELETE request to the server to remove the ad.
     *
     * @param {string} adId - The ID of the advertisement to be deleted.
     * @param {string} listType - The type of list the ad belongs to (e.g., 'nonApproved', 'approved').
     */
    const deleteAd = async (adId, listType) => {
        try {
            const response = await fetch(`/adminActions/ad/delete/${adId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Ad deleted successfully');
                location.reload();

                const adElement = document.getElementById(`${listType}Ad-${adId}`);
                if (adElement) {
                    adElement.remove();

                }
            } else {
                console.error('Failed to delete ad');
            }
        } catch (error) {
            console.error('Error deleting ad:', error);
        }
    };

    // Event listener for clicks on the 'unapprovedAds' list
    document.getElementById('unapprovedAds').addEventListener('click', (event) => {
        if (event.target.classList.contains('approve-btn')) {
            const adId = event.target.dataset.adId;
            approveAd(adId);
        }

        if (event.target.classList.contains('delete-btn')) {
            const adId = event.target.dataset.adId;
            deleteAd(adId, 'nonApproved');
        }
    });

    // Event listener for clicks on the 'approvedAds' list
    document.getElementById('approvedAds').addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const adId = event.target.dataset.adId;
            deleteAd(adId, 'approved');
        }
    });
});
