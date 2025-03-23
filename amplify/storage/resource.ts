import { defineStorage } from '@aws-amplify/backend';

export const firstBucket = defineStorage({
    name: 'firstBucket',
    isDefault: true,
    access: (allow) => ({
      'picture-submissions/*': [
        // Everyone (even guests) can read files
        allow.guest.to(['read']),
        // Only users in the "Uploader" group can write or delete files
        allow.groups(['Uploader']).to(['write', 'delete', 'read']),
        // Everyone authenticated can read their own files if needed
        allow.entity('identity').to(['read'])
      ]
    })
  });
  
  
  export const secondBucket = defineStorage({
    name: 'secondBucket',
    access: (allow) => ({
      'private/{entity_id}/*': [
        allow.entity('identity').to(['read', 'write', 'delete'])
      ]
    })
  }) 