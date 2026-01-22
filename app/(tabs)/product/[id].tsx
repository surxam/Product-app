import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import axios from "axios";
import { Product } from "../../types/product";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [Loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);

    try {
      const query = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );

      // Adapter les données de l'API fakestore
      const adaptedProduct: Product = {
        id: query.data.id.toString(),
        name: query.data.title,
        price: query.data.price,
        description: query.data.description,
        image: query.data.image,
        category: query.data.category,
        rating: query.data.rating.rate,
      };

      setProduct(adaptedProduct);
    } catch (error) {
      console.error("Erreur lors du chargement du produit:", error);
    }

    setLoading(false);
  };

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  if (Loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Chargement...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Produit non trouvé</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    Alert.alert("Succès", `${product.name} ajouté au panier`);
  };

  const handleBuyNow = () => {
    Alert.alert("Achat", `Achat de ${product.name} pour $${product.price}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Image du produit */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Informations du produit */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.name}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {product.rating}</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.price}>${product.price}</Text>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Détails additionnels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>SKU:</Text>
            <Text style={styles.detailValue}>PROD-{product.id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Catégorie:</Text>
            <Text style={styles.detailValue}>{product.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Disponibilité:</Text>
            <Text style={styles.detailValue}>En stock</Text>
          </View>
        </View>

        {/* Boutons d'action */}
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonTextSecondary}>Ajouter au panier</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleBuyNow}
          >
            <Text style={styles.buttonTextPrimary}>Acheter maintenant</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    marginRight: 12,
    color: "#FFA500",
  },
  category: {
    fontSize: 12,
    backgroundColor: "#e3f2fd",
    color: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#999",
    width: "40%",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
  },
  buttonSecondary: {
    backgroundColor: "#f0f0f0",
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  errorText: {
    fontSize: 16,
    color: "#666",
  },
});
