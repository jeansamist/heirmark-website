import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type CollectionOrderConfirmationEmailProps = {
  clientName: string;
  quantity: number;
};

export function CollectionOrderConfirmationEmail({
  clientName,
  quantity,
}: CollectionOrderConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your HeirMark Collection Order Is Confirmed</Preview>
      <Body style={body}>
        <Container style={container}>
          <Heading style={heading}>Hello {clientName},</Heading>

          <Text style={text}>
            Thank you for purchasing the HeirMark 3-Book Collection.
          </Text>
          <Text style={text}>
            Your order has been successfully received, and we are preparing your
            collection with care.
          </Text>
          <Text style={text}>
            Because each order is handled personally, a member of our team will
            follow up with shipping details shortly.
          </Text>
          <Text style={text}>Quantity: {quantity}</Text>

          <Hr style={divider} />

          <Section>
            <Text style={text}>If you have any immediate questions:</Text>
            <Text style={text}>+1 (206) 851-5052</Text>
            <Text style={text}>
              <Link
                href="mailto:info@theheirmarkframework.com"
                style={link}
              >
                info@theheirmarkframework.com
              </Link>
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={text}>
            You didn&apos;t just purchase books, you invested in your family&apos;s
            legacy.
          </Text>
          <Text style={text}>We look forward to this journey with you.</Text>
          <Text style={text}>
            With gratitude,
            <br />
            The HeirMark Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f2f6f7",
  fontFamily: "Arial, Helvetica, sans-serif",
  margin: 0,
  padding: "24px 12px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #dbe4e7",
  borderRadius: "14px",
  margin: "0 auto",
  maxWidth: "640px",
  padding: "30px",
};

const heading = {
  color: "#0f1f24",
  fontSize: "28px",
  lineHeight: "34px",
  margin: "0 0 16px",
};

const text = {
  color: "#0f1f24",
  fontSize: "16px",
  lineHeight: "25px",
  margin: "0 0 14px",
};

const divider = {
  borderColor: "#dbe4e7",
  margin: "20px 0",
};

const link = {
  color: "#2d5f6e",
  textDecoration: "underline",
};

export default CollectionOrderConfirmationEmail;
