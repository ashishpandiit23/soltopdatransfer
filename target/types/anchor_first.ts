export type AnchorFirst = {
  "version": "0.1.0",
  "name": "anchor_first",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "accountUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "accountUser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "string"
          }
        ]
      }
    }
  ]
};

export const IDL: AnchorFirst = {
  "version": "0.1.0",
  "name": "anchor_first",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "accountUser",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "accountUser",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "string"
          }
        ]
      }
    }
  ]
};
