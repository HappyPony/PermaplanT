# Map Undo/Redo Implementation

## Problem

Undo/redo functionality is a common feature in many applications, PermaplanT is no exception.
The user should be able to undo/redo the actions taken within the canvas.

## Constraints

1. The implementation of undo/redo should not have a significant impact on the performance of the app.
2. The implementation of undo/redo should correspond to the related [use case](/doc/usecases/map_undo_redo.md)

## Assumptions

N/A

## Solutions

### Store every step of the user in the database

The idea is to store every step of the user taken within the canvas in the database.
The user can then undo/redo the actions by fetching the previous/next step from the database.
The user is working with the canvas locally, but the state of the canvas is stored in the database.
The main drawback of this approach is that the database will grow significantly over time.
We have to store the entire state of the canvas for every step taken by the user.
This could lead to performance issues in the future.

Let's assume that there are 1000 users using the app.
We have ~19 layers in the app.
If the user places 10 shapes on each layer and modifies the properties of each shape 3 times, we have 570 actions taken by the user for each layer.
If we store the entire state of the canvas for every action taken by the user, we have 10,830 actions stored in the database for each user.
If we have 1000 users, we have 10,830,000 actions stored in the database for a single day. This number will grow drastically over time.

Alternatively, storing only the final state of the canvas in the database would result in a much smaller number of entries.
Since there is only one entry per map, we would have a maximum of 1000 entries for the same amount of users for a single day or even for a longer period of time.

## Decision

The decision is to implement undo/redo functionality by storing intermediate states of the canvas on the frontend and only storing the final state in the database.

To keep the backend state in sync with the frontend, a periodic sync strategy will be used according to some custom rule, rather than an immediate sync every time the user takes an action on the canvas.
This avoids the potential for delays and performance issues caused by excessive processing and network traffic.
Instead, syncing periodically ensures up-to-date data while minimizing network traffic and data transfer costs.
The periodic sync approach allows the user to work locally on the canvas, reducing the performance impact of storing and retrieving data from the database.

When the app is refreshed, the frontend will rebuild the map from scratch based on the data fetched from the backend.

## Rationale

The canvas library, that we use, provides a suggestion on how to implement undo-redo functionality with the canvas<sup>2</sup>.

> If you want to save/load simple canvas content you can use the built-in Konva methods: node.toJSON() and Node.create(json). But those methods are useful only in very small apps. In bigger apps it is VERY hard to use those methods. Why? Because the tree structure is usually very complex in larger apps, you may have a lot of event listeners, images, filters, etc. That data is not serializable into JSON (or it is very hard to do that).

In other words, the Konva nodes contain too much information e.g. color or shape which could be set by default.
So there is no reason to store them in the database if they are set by default by Konva anyways.
Instead, we should only store the information that the user has changed.

> You just need to save a history of all the state changes within your app.

Implementing the undo/redo functionality on the frontend, as suggested above, provides a simpler and more efficient solution than storing every step of the user in the database.
Storing intermediate states of the canvas in the frontend store allows the user to work locally in the canvas without significant performance impact.
Additionally, syncing the backend state with the frontend state periodically ensures that the user's data is always up-to-date.

## Implications

N/A

## Related Decisions

-   [Frontend State Management](/doc/decisions/frontend_state_management.md)

## Notes

1.  Konva suggestion on how to implement undo-redo functionality
    -   https://konvajs.org/docs/react/Undo-Redo.html
    -   https://konvajs.org/docs/data_and_serialization/Best_Practices.html#page-title
2.  Example JSON of the state in the frontend store

    ```JSON
    {
    "state": [
    {
          "timestamp": 1,
          "stage": {
          "backgroundColor": "0x000000",
          "children": [
          {
                "name": "myRectangle",
                "x": 0,
                "y": 0,
                "children": [
                {
                "name": "myText",
                "x": 0,
                "y": 0,
                "children": []
                }
                ]
          },
          {
                "name": "myCircle",
                "x": 100,
                "y": 100,
                "children": []
          }
          ]
          },
          "layers": {
          "baseLayer": {
          "isEnabled": true,
          "backgroundImage": "http://www.example.com/image.png"
          }
          }
    },
    {
          "timestamp": 2,
          "stage": {
          "backgroundColor": "0x000000",
          "children": [
          {
                "name": "myRectangle",
                "x": 0,
                "y": 0,
                "children": [
                {
                "name": "myText",
                "x": 0,
                "y": 0,
                "children": []
                }
                ]
          },
          {
                "name": "myCircle",
                "x": 100,
                "y": 100,
                "children": []
          }
          ]
          },
          "layers": {
          "baseLayer": {
          "isEnabled": false,
          "backgroundImage": "http://www.example.com/image.png"
          }
          }
    }
    ]
    }
    ```
