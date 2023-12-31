import React, { useState, useEffect } from "react";
import {


  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";

import i18n from "../../../assets/strings/I18n";

import Theme from "../../styles/Theme";

import imagenTest from "../../../assets/images/various/imagenCasaTest.png";
import PanelDetalles from "../../components/componenteREDP/detalles";
import Estados from "../../../assets/funcionTraduccion";
import { deleteAsset, updateAsset } from "../../../api/assetsAPI";


export default function DetallePropiedadRSUI({ informacion, booking }) {
  //console.log(mostrarBotones.mostrarBotones);
  //{mostrarBotones.mostrarBotones ? <Text>Bienvenidos, Usuario</Text> : null}
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPausarVisible, setModalPausarVisible] = useState(false);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [propiedadDuplicado, setPropiedadDuplicado] = useState([])
  const necesitaBoton = ['venta', 'alquiler', 'pausada', 'alquilada']



  const [fontsLoaded, fontError] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }



  const pausar = () => {
    console.log("pausar");
    setModalVisible(true)
    setModalPausarVisible(true)
  };

  const eliminar = () => {
    console.log("eliminar");
    setModalVisible(true)
    setModalEliminarVisible(true)
  };

  const handlePausar = async () => {
    try {
      setPropiedadDuplicado(informacion)
      let estado = 2
      if (informacion.state === 2) {
        estado = 1
      }

      const nuevoEstado = {
        "state": estado
      }

      const respuesta = await updateAsset(nuevoEstado, informacion._id)
      if (respuesta.status === 200) {
        navigation.navigate('Home');
      }

    } catch (error) {
      console.log(error);
    }
  }

  const cerrarModales = (numero) => {
    if (numero == 1) {
      handlePausar()
    }
    if (numero == 2) {
      handleDelete()
    }
    setModalVisible(false)
    setModalPausarVisible(false)
    setModalEliminarVisible(false)
  }
  const handleDelete = async () => {
    try {

      respuesta = await deleteAsset(informacion._id)
      console.log(respuesta, 'ta');
      if (respuesta.status == 200) {
        navigation.navigate("LandingStackRE");
      }

    }
    catch (error) {
      console.error('Error al obtener la busqduedass:', error);
    }
  }

  let tipo = Estados(informacion.transaction, informacion.state)

  let mostrarBotones = false
  if (necesitaBoton.includes(tipo)) {
    mostrarBotones = true
  }



  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}
        onRequestClose={() => {
          setModalPausarVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalPausarVisible ? <Text style={styles.modalText}>{tipo === 'pausada' ? i18n.t("detallePropiedadInmobiliaria.textoModalDespausar") : i18n.t("detallePropiedadInmobiliaria.textoModalPausar")}</Text> : null}
            {modalEliminarVisible ? <Text style={styles.modalText}>{i18n.t("detallePropiedadInmobiliaria.textoModalEliminar")}{"\n"}{"\n"}{i18n.t("detallePropiedadInmobiliaria.textoModalEliminar2")}</Text> : null}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', paddingVertical: 5 }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => cerrarModales(0)}>
                <Text style={styles.textStyle}>{i18n.t("detallePropiedadInmobiliaria.cancelarModal")}</Text>
              </TouchableOpacity>
              {modalPausarVisible ?
                <TouchableOpacity
                  style={[styles.button, styles.botonPausa]}
                  onPress={() => cerrarModales(1)}>
                  <Text style={[styles.textStyle, styles.colorNegroFuente]}>{tipo === 'pausada' ? i18n.t("detallePropiedadInmobiliaria.despausar") : i18n.t("detallePropiedadInmobiliaria.pausar")}</Text>
                </TouchableOpacity> : null}
              {modalEliminarVisible ?
                <TouchableOpacity
                  style={[styles.button, styles.botonEliminar]}
                  onPress={() => cerrarModales(2)}>
                  <Text style={styles.textStyle}>{i18n.t("detallePropiedadInmobiliaria.eliminar")}</Text>
                </TouchableOpacity> : null}

            </View>

          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => navigation.navigate("PublicacionPropiedad", { propiedadId: informacion._id, name: informacion.title })} style={styles.divImagen}>
        {informacion.image && informacion.image.length > 0 ? <Image src={informacion.image[0]} style={styles.imagen} /> : <Image source={imagenTest} style={styles.imagen} /> }
        
      </TouchableOpacity>
      {mostrarBotones ? (
        <View style={styles.botonera}>
          {tipo === "alquilada" || tipo === "vendida" ? null : <>
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdatePropiedad", { propiedadId: informacion._id })}
              style={[styles.boton, styles.botonMod]}
            >
              <Text style={styles.botonTexto}>
                {i18n.t("detallePropiedadInmobiliaria.modificarPublicacion")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pausar()}
              style={[styles.boton, styles.botonPausa]}
            >
              <Text style={styles.botonTexto}>
                {tipo === 'pausada' ? i18n.t("detallePropiedadInmobiliaria.despausar") : i18n.t("detallePropiedadInmobiliaria.pausar")}
              </Text>
            </TouchableOpacity>
          </>}

          <TouchableOpacity
            onPress={() => eliminar()}
            style={[styles.boton, styles.botonEliminar]}
          >
            <Text style={[styles.botonTexto, styles.textoEliminar]}>
              {i18n.t("detallePropiedadInmobiliaria.eliminar")}
            </Text>
          </TouchableOpacity>

        </View>
      ) : <View style={styles.botonera}>
        <TouchableOpacity
          onPress={() => eliminar()}
          style={[styles.boton, styles.botonEliminar]}
        >
          <Text style={[styles.botonTexto, styles.textoEliminar]}>
            {i18n.t("detallePropiedadInmobiliaria.eliminar")}
          </Text>
        </TouchableOpacity>

      </View>}
      <PanelDetalles datosPropiedad={informacion} tipo={tipo} booking={booking} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%'
  },
  imagen: {
    width: "80%",
    borderRadius: 15,
    height: "80%",
  },
  divImagen: {
    width: "100%",
    height: "30%",

    alignItems: "center",
    justifyContent: "center",
  },
  botonera: {
    flexDirection: "row", // Alineación horizontal
    justifyContent: "space-evenly", // Alineación central horizontal
    alignItems: "center",
  },
  boton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
  },

  botonTexto: {
    fontFamily: "Poppins_500Medium",
    fontSize: Dimensions.get("window").width * 0.038,
  },

  botonMod: {
    backgroundColor: Theme.colors.FONDOS,
  },

  botonPausa: {
    backgroundColor: Theme.colors.FONDOCARD,
  },
  botonEliminar: {
    backgroundColor: Theme.colors.BTNELIMINAR,
  },


  botonMod: {
    backgroundColor: Theme.colors.FONDOS
  },

  botonPausa: {
    backgroundColor: Theme.colors.FONDOCARD
  },
  botonEliminar: {
    backgroundColor: Theme.colors.BTNELIMINAR
  },

  textoEliminar: {
    color: Theme.colors.FONDOS
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',


  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  colorNegroFuente: {
    color: 'black',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: "Poppins_500Medium",
    fontSize: Dimensions.get("window").width * 0.039,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: "Poppins_500Medium",
    fontSize: Dimensions.get("window").width * 0.039,
  },

})

