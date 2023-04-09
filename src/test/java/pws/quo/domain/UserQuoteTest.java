package pws.quo.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import pws.quo.web.rest.TestUtil;

class UserQuoteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserQuote.class);
        UserQuote userQuote1 = new UserQuote();
        userQuote1.setId(1L);
        UserQuote userQuote2 = new UserQuote();
        userQuote2.setId(userQuote1.getId());
        assertThat(userQuote1).isEqualTo(userQuote2);
        userQuote2.setId(2L);
        assertThat(userQuote1).isNotEqualTo(userQuote2);
        userQuote1.setId(null);
        assertThat(userQuote1).isNotEqualTo(userQuote2);
    }
}
