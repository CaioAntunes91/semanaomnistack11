import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from './../../services/api';

import logoImg from '../../assets/logo.png';// Com a nomenclatura utilizada ao salvar as imagens, o react native já importará a opção que mais se adequar a cada dispositivo

import styles from './styles';

export default function Incidents() {//Esta função será responsável por linkar as páginas no botão "ver mais detalhes"
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);// Esse estado foi criado para garantir que apenas dados novos sejam buscados. Carregar uma página por vez.

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    };

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        // Os dois condicionais anteriores trazem a keyword return sem nada pois a intenção é interromper o acionamento da função nas duas situções descritas.

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([ ... incidents, ... response.data]);// Dessa forma estamos garantindo que as páginas sejam acumuladas e não sobreescritas.
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    };

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                         style: 'currency',
                         currency: 'BRL'
                    }).format(incident.value)}
                    </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}