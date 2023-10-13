import React from 'react';
import {Card, List} from 'semantic-ui-react';

const CustomResultCard = ({result}) => (
    <div>
        <Card fluid>
            <Card.Content>
                <Card.Header>Registration: {result.registration?.raw || "Uknown"}</Card.Header>
                <Card.Meta>

                    <span>{(new Date(result.date?.raw))?.toLocaleDateString() || "Uknown date"}</span>-{" "}
                    <span>{result.time?.raw ? result.time?.raw.slice(0, 2) + ':' + result.time?.raw.slice(2) : "Uknown time"}</span>
                    <br />
                    <span>{result.route?.raw || "Uknown route"}</span>
                    <br />
                    <span>{result.operator?.raw || "Uknown operator"}</span>-{" "}
                    <span>{result.ac?.raw || "Uknown AC Type"}</span>
                </Card.Meta>
                <Card.Description>
                    {result.summary?.raw || "No report"}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <List>
                    <List.Item>
                        <List.Icon name='pin' />
                        <List.Content>{result.location?.raw || "Uknown location"}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>{result.aboard?.raw || "Uknown"}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='user delete' />
                        <List.Content>{result.fatalities?.raw}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='hospital' />
                        <List.Content>{result.ground?.raw}</List.Content>
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
    </div>
);

export default CustomResultCard;
