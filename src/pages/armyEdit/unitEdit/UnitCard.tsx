import classes from './UnitCard.module.css';
import { Button, Paper, Title, useMantineTheme, Text } from '@mantine/core';

interface CardProps {
    image: string;
    title: string;
    category: string;
}
export function UnitCard({ image, title, category }: CardProps) {
    return (
        <Paper
          shadow="md"
          p="xl"
          radius="md"
          style={{ backgroundImage: `url(${image})` }}
          className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
        </Paper>
    );
}