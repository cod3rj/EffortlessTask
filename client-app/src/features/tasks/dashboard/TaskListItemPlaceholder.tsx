import { Placeholder, Card } from "semantic-ui-react";

export default function TaskListItemPlaceholder() {
    return (
            <Card>
                <Card.Content>
                    <Placeholder fluid>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Card.Content>
            </Card>
    )
}